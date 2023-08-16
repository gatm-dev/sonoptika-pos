/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Box, Stack, IconButton, Button } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { GlobalContext } from "../context/GlobalContext";

const Counter = ({ item }) => {
  const { carrito, setCarrito } = useContext(GlobalContext);

  return carrito.some((i) => i.IdProducto === item) ? (
    <Stack direction={"row"} alignItems={"center"}>
      <IconButton
        onClick={() =>
          setCarrito(
            carrito.map((i) =>
              i.IdProducto === item && i.cantidad > 1
                ? { ...i, cantidad: i.cantidad - 1 }
                : { ...i }
            )
          )
        }
      >
        <RemoveIcon />
      </IconButton>
      {carrito.find((i) => i.IdProducto === item).cantidad}
      <IconButton
        onClick={() =>
          setCarrito(
            carrito.map((i) =>
              i.IdProducto === item
                ? { ...i, cantidad: i.cantidad + 1 }
                : { ...i }
            )
          )
        }
      >
        <AddIcon />
      </IconButton>
    </Stack>
  ) : (
    <Button
      variant={"outlined"}
      endIcon={<AddIcon />}
      size="small"
      onClick={() =>
        setCarrito([...carrito, { IdProducto: item, cantidad: 1 }])
      }
    >
      Agregar al carrito
    </Button>
  );
};

export default Counter;