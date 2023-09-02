/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useParams, Link as LinkRouter } from "react-router-dom";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import Counter from "../components/Counter";

import SunGlassSVG from "../assets/1088490.svg";

const Productos = () => {
  const { tipoProducto } = useParams();
  const [objTipoProducto, setObjTipoProducto] = useState({});
  const {
    productos,
    tipoProductos,
    handleGetProductos,
    handleGetTipoProductos,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (tipoProductos === undefined) handleGetTipoProductos();
    const obj = tipoProductos?.find((p) => p.TipoProducto === tipoProducto);
    setObjTipoProducto(obj || {});
  }, [tipoProducto]);

  useEffect(() => {
    let { Categoria, TipoProducto } = objTipoProducto;
    if (Categoria === undefined || TipoProducto === undefined) return;
    handleGetProductos(Categoria, TipoProducto);
  }, [objTipoProducto]);

  return (
    <Box sx={{ maxHeight: 200 }}>
      <Stack direction="column" spacing={2} position={"sticky"}>
        <Typography variant="body2">Productos</Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">{objTipoProducto.TipoProducto}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <ImageList cols={2} rowHeight={"auto"} gap={20} sx={{ maxWidth: "100%" }}>
        {productos &&
          productos?.map((item) => (
            <ImageListItem key={item.Sku}>
              <Box
                src={`${
                  /*handleGetImg(item?.Sku) ||*/ SunGlassSVG
                }?w=248&fit=crop&auto=format`}
                srcSet={`${
                  /*handleGetImg(item?.Sku) || */ SunGlassSVG
                }?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.NombreComercial}
                loading="lazy"
                sx={{ maxWidth: "20vw", alignSelf: "center" }}
                component={"img"}
              />
              <Stack
                direction="column"
                spacing={1}
                alignItems={"center"}
                justifyContent={"space-around"}
              >
                <ImageListItemBar
                  title={
                    <>
                      {item?.NombreComercial}
                      <br />
                      <small>{item?.Sku}</small>
                    </>
                  }
                  subtitle={<span>by: {item?.Marca}</span>}
                  position="below"
                />
                <Counter item={item} />
                <Button
                  variant="contained"
                  color="primary"
                  component={LinkRouter}
                  to={`/producto/${item.Sku}`}
                  fullWidth
                >
                  Ver detalles
                </Button>
              </Stack>
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default Productos;
