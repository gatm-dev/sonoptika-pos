/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Typography, Stack, Chip } from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import SunGlasses from "../assets/1088490.svg";
import Counter from "../components/Counter";

const Producto = () => {
  const { idProducto } = useParams();
  const [objProducto, setObjProducto] = useState({});
  const { productos, handleGetDefArm, defArm } = useContext(GlobalContext);

  useEffect(() => {
    const obj = productos?.find((p) => p.Sku === idProducto);
    setObjProducto(obj || {});
  }, [idProducto]);

  useEffect(() => {
    if (objProducto?.IdProducto) handleGetDefArm(objProducto?.IdProducto);
  }, [objProducto]);

  if (idProducto === undefined) return <>No hay producto para mostrar</>;
  return (
    <>
      <Typography variant="body2">Producto</Typography>
      <Stack direction="row" spacing={2}>
        <Typography variant="body2">{defArm?.TipoProducto}</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack
        direction="column"
        spacing={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ maxWidth: "20vw", alignSelf: "center" }}
          component={"img"}
          src={SunGlasses}
        />
        <Typography variant="h6">{defArm?.NombreComercial}</Typography>
        <Typography variant="body2">
          <strong>SKU:</strong> {defArm?.Sku}
        </Typography>
        <Typography variant="body2">
          <strong>Marca:</strong> {defArm?.Marca}
        </Typography>
        <Typography variant="body2">
          <strong>Modelo:</strong> {defArm?.Modelo}
        </Typography>
        <Typography variant="body2">
          <strong>Precio:</strong>{" "}
          <Chip
            label={Number(defArm?.PrecioVenta).toFixed(2)}
            variant="filled"
            color="primary"
          />
        </Typography>
        <Counter item={defArm.IdProducto} />
      </Stack>
    </>
  );
};

export default Producto;
