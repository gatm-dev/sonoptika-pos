import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";

import Landing from "./routes/Landing.jsx";
import Productos from "./routes/Productos.jsx";
import Producto from "./routes/Producto.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/" element={<App />}>
            <Route exact element={<Landing />} index />
            <Route exact path="/producto/:idProducto" element={<Producto />} />
            <Route
              exact
              path="/productos/:tipoProducto"
              element={<Productos />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
