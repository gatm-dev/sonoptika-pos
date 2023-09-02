/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { createContext, useState, useEffect, useRef } from "react";
import { firestore, storage } from "../firebase/client";
import { ref as imgRef, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  and,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
  const splashRef = useRef(null);
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [tipoProductos, setTipoProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [defArm, setDefArm] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [changeScrollColor, setChangeScrollColor] = useState(false);
  const [confirmCheckout, setConfirmCheckout] = useState(false);
  const [compraId, setCompraId] = useState("");

  const handleGetTipoProductos = async () => {
    setLoading(true);
    const q = query(
      collection(firestore, "CatTipoProducto"),
      where("Activo", "==", true)
    );
    getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setTipoProductos(data);
      })
      .catch((error) => console.log("Error al obtener el documento: ", error));
    setLoading(false);
  };

  const handleGetProductos = async (categoria, tipoProducto) => {
    setLoading(true);
    const q = query(
      collection(firestore, "CatProductos"),
      and(
        where("Activo", "==", true),
        where("Categoria", "==", categoria),
        where("TipoProducto", "==", tipoProducto)
      )
    );
    getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProductos(data);
      })
      .catch((error) => console.log("Error al obtener el documento: ", error));
    setLoading(false);
  };

  const handleGetDefArm = async (idProducto) => {
    setLoading(true);
    const q = query(
      collection(firestore, "CatProductos"),
      and(where("Activo", "==", true), where("IdProducto", "==", idProducto))
    );
    getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setDefArm(data[0]);
      })
      .catch((error) => console.log("Error al obtener el documento: ", error));
    setLoading(false);
  };

  const handleGetImg = async (idProducto) => {
    setLoading(true);
    const storageRef = imgRef(storage, `Productos/${idProducto}.png`);
    getDownloadURL(storageRef)
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
    setConfirmCheckout(false);
    setCompraId("");
    confirmCheckout && setConfirmCheckout(false);
  };

  const handlePostCarrito = (e) => {
    e.preventDefault();
    setLoading(true);
    const orderRef = collection(firestore, "CatOrdenes");
    const payload = {
      cliente: {
        nombre: "Juan",
        telefono: "1234567890",
        email: "juan@example.com",
      },
      productos: carrito,
      total: carrito.reduce((acc, item) => acc + item.PrecioVenta, 0),
    };

    addDoc(orderRef, payload).then((docRef) => {
      setCompraId(docRef.id);
    });
    setLoading(false);
  };

  useEffect(() => {
    if (tipoProductos.length === 0) handleGetTipoProductos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      containerRef.current.scrollTop > splashRef.current.clientHeight
        ? setChangeScrollColor(true)
        : setChangeScrollColor(false);
    };
    containerRef?.current?.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return (
    <GlobalContext.Provider
      value={{
        splashRef,
        tipoProductos,
        productos,
        handleGetTipoProductos,
        handleGetProductos,
        defArm,
        handleGetDefArm,
        carrito,
        setCarrito,
        containerRef,
        changeScrollColor,
        handlePostCarrito,
        compraId,
        loading,
        confirmCheckout,
        setConfirmCheckout,
        handleVaciarCarrito,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
