/* eslint-disable react/prop-types */

const inDev = true;

const endpoint = inDev
  ? "https://api.frame-shamir.com/Respaldo6/pos"
  : "https://api.frame-shamir.com/Respaldo6/pos";

import { createContext, useState, useEffect, useRef } from "react";
import { firestore } from "../firebase/client";
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
  const splashRef = useRef(null);
  const containerRef = useRef(null);

  const [tipoProductos, setTipoProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [defArm, setDefArm] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [changeScrollColor, setChangeScrollColor] = useState(false);

  const handleGetTipoProductos = async () => {
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
  };

  const handleGetProductos = async (categoria, tipoProducto) => {
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
  };

  const handleGetDefArm = async (idProducto) => {
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
  };

  useEffect(() => {
    handleGetTipoProductos();
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
        handleGetProductos,
        defArm,
        handleGetDefArm,
        carrito,
        setCarrito,
        containerRef,
        changeScrollColor,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
