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
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import Counter from "../components/Counter";
import SunGlassSVG from "../assets/1088490.svg";

const Productos = () => {
  const { tipoProducto } = useParams();
  const [objTipoProducto, setObjTipoProducto] = useState({});
  const { productos, tipoProductos, handleGetProductos } =
    useContext(GlobalContext);

  useEffect(() => {
    const obj = tipoProductos?.find((p) => p.TipoProducto === tipoProducto);
    setObjTipoProducto(obj || {});
  }, [tipoProducto]);

  useEffect(() => {
    handleGetProductos(objTipoProducto.Categoria, objTipoProducto.TipoProducto);
  }, [objTipoProducto]);

  return (
    <Box sx={{ maxHeight: 200 }}>
      <Typography variant="body2">Productos</Typography>
      <Typography variant="h6">{objTipoProducto.TipoProducto}</Typography>
      <ImageList cols={2} rowHeight={"auto"} gap={20} sx={{ maxWidth: "100%" }}>
        {productos &&
          productos?.map((item) => (
            <ImageListItem key={item.Sku}>
              <Box
                src={`${SunGlassSVG}?w=248&fit=crop&auto=format`}
                srcSet={`${SunGlassSVG}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.NombreComercial}
                loading="lazy"
                sx={{ height: "100%", maxWidth: "20vw" }}
                component={"img"}
              />
              <Stack
                direction="row"
                spacing={1}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <ImageListItemBar
                  sx={{
                    p: 2,
                  }}
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
                <Counter item={item.IdProducto}/>
                <Button
                  variant="contained"
                  color="primary"
                  component={LinkRouter}
                  to={`/producto/${item.Sku}`}
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
