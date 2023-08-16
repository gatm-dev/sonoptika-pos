/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useRef } from "react";

const inDev = true; // cambiar a false cuando se compre el hosting
const endpoint = inDev
  ? "https://api.frame-shamir.com/Respaldo6/pos"
  : "https://api.frame-shamir.com/Respaldo6/pos";

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
    const response = await fetch(`${endpoint}/ConsultaTipoProductos`);
    const data = await response.json();
    setTipoProductos(data);
  };

  const handleGetProductos = async (categoria, tipoProducto) => {
    const response = await fetch(
      `${endpoint}/ConsultaProductos?Categoria=${categoria}&TipoProducto=${tipoProducto}`
    );
    const data = await response.json();
    setProductos(data);
  };

  const handleGetDefArm = async (idProducto) => {
    const response = await fetch(
      `${endpoint}/ConsultaArm?idProducto=${idProducto}`
    );
    const data = await response.json();
    if (data && Array.isArray(data)) setDefArm(data[0]);
    else setDefArm(data);
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
