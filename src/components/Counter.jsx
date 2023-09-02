/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

import { Stack, IconButton, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Counter = ({ item, disabled = false }) => {
  const { carrito, setCarrito } = useContext(GlobalContext);
  const [cantidad, setCantidad] = useState(0);
  const exists =
    carrito?.find((i) => i?.IdProducto === item?.IdProducto) || null;

  useEffect(() => {
    if (exists) {
      setCantidad(exists?.cantidad);
    } else {
      setCantidad(0);
    }
  }, [carrito, exists]);

  const handleSetCount = (count) => {
    if (count === 0) {
      setCarrito(carrito.filter((i) => i.IdProducto !== item.IdProducto));
    } else {
      setCarrito(
        carrito?.map((i) =>
          i.IdProducto === item.IdProducto
            ? {
                ...i,
                cantidad: count,
                precio: count * item?.PrecioVenta,
              }
            : { ...i }
        )
      );
    }
  };

  if (exists)
    return (
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton
          onClick={() => cantidad > 0 && handleSetCount(cantidad - 1)}
          disabled={disabled}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant={"body2"}>{cantidad}</Typography>
        <IconButton
          onClick={() => handleSetCount(cantidad + 1)}
          disabled={disabled}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    );

  if (exists === null)
    return (
      <Button
        disabled={disabled}
        variant={"outlined"}
        endIcon={<AddIcon />}
        size="small"
        onClick={() =>
          setCarrito([
            ...carrito,
            { ...item, cantidad: 1, precio: item?.PrecioVenta },
          ])
        }
      >
        Agregar al carrito
      </Button>
    );
};

export default Counter;
