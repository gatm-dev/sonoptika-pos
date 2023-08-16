import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Typography,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
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
    if (objProducto) handleGetDefArm(objProducto?.IdProducto);
  }, [objProducto]);

  return (
    <>
      <Typography variant="body2">Producto</Typography>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2">{defArm?.TipoProducto}</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Box alignItems={"center"} justifyContent={"center"} display={"grid"}>
        <Box
          sx={{ height: "100%", maxWidth: "20vw" }}
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
          <strong>Precio:</strong> ${Number(defArm?.PrecioVenta).toFixed(2)}
        </Typography>
        <Counter item={defArm.IdProducto} />
      </Box>
    </>
  );
};

export default Producto;
