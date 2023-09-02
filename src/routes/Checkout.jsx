import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  Button,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import Counter from "../components/Counter";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    carrito,
    handlePostCarrito,
    compraId,
    confirmCheckout,
    setConfirmCheckout,
    handleVaciarCarrito,
    payload,
    setPayload,
  } = useContext(GlobalContext);

  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(10);

  const handleCancelCheckout = () => {
    handleVaciarCarrito();
    navigate("/");
  };

  const handleSetPayload = (e) => {
    setPayload({
      ...payload,
      cliente: {
        ...payload.cliente,
        [e.target.name]: e.target.value,
      },
    });
  };

  const clear = () => {
    if (count === 10) setInterval(() => setCount((prev) => prev - 1), 1000);
    if (count <= 0) handleCancelCheckout();
  };

  useEffect(() => {
    setTotal(carrito.reduce((acc, item) => acc + item?.precio, 0));
  }, [carrito]);

  if (carrito.length === 0)
    return (
      <Stack
        direction={"column"}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100 }} />
        <Typography variant="h6">No hay productos en el carrito</Typography>
      </Stack>
    );

  if (compraId) {
    clear();
    return (
      <Stack
        direction={"column"}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4">Compra realizada con éxito</Typography>
        <Typography variant="body2">
          Id de compra: <strong>{compraId}</strong>
        </Typography>
        <Typography variant="body2">
          Seras redireccionado automaticamente a la pagina principal en {count}{" "}
          segundos
        </Typography>
      </Stack>
    );
  }

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
          <Typography variant="h6">CHECKOUT</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={confirmCheckout ? 4 : 12}>
          <Typography variant="h6">Resumen</Typography>
          <hr />
          <Grid
            container
            sx={{
              alignItems: "center",
              flexDirection: "column",
            }}
            spacing={2}
          >
            <Grid item>
              <h2>Resumen de compra</h2>
            </Grid>
            <Grid
              item
              sx={{
                alignContent: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <h3>Productos:</h3>
              <ul>
                {carrito.map((item) => (
                  <li key={item.IdProducto}>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.NombreComercial}
                      <Counter item={item} disabled={confirmCheckout} />
                    </Stack>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item>
              <h3>Total:{total}</h3>
            </Grid>
            <Grid item>
              {!confirmCheckout && (
                <Stack direction={"row"} spacing={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelCheckout}
                  >
                    Vaciar carrito
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => setConfirmCheckout(true)}
                  >
                    Confirmar órden
                  </Button>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Grid>
        {confirmCheckout && (
          <Grid item xs={8}>
            <Typography variant="h6">Finalizar compra</Typography>
            <hr />
            <form onSubmit={handlePostCarrito}>
              <Stack direction="column" spacing={1}>
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2">Datos personales</Typography>
                  <Stack direction="row" spacing={1} sx={{ display: "flex" }}>
                    <TextField
                      label="Apellido Paterno"
                      variant="outlined"
                      size="small"
                      value={payload.cliente.apellidoPaterno}
                      onChange={handleSetPayload}
                      name="apellidoPaterno"
                    />
                    <TextField
                      label="Apellido Materno"
                      variant="outlined"
                      size="small"
                      value={payload.cliente.apellidoMaterno}
                      onChange={handleSetPayload}
                      name="apellidoMaterno"
                    />
                    <TextField
                      label="Nombre"
                      variant="outlined"
                      size="small"
                      sx={{ flexGrow: 1 }}
                      value={payload.cliente.nombre}
                      onChange={handleSetPayload}
                      name="nombre"
                    />
                  </Stack>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2">Datos de contacto</Typography>
                  <Stack direction="row" spacing={1} sx={{ display: "flex" }}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      size="small"
                      sx={{ flexGrow: 1 }}
                      value={payload.cliente.email}
                      onChange={handleSetPayload}
                      name="email"
                    />
                    <TextField
                      label="Teléfono"
                      variant="outlined"
                      size="small"
                      value={payload.cliente.telefono}
                      onChange={handleSetPayload}
                      name="telefono"
                    />
                  </Stack>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2">Datos de envío</Typography>
                  <Stack direction="column" spacing={1}>
                    <TextField
                      label="Dirección"
                      variant="outlined"
                      size="small"
                    />
                    <Stack direction="row" spacing={1} sx={{ display: "flex" }}>
                      <TextField
                        label="Ciudad"
                        variant="outlined"
                        size="small"
                        value={payload.cliente.ciudad}
                        onChange={handleSetPayload}
                        name="ciudad"
                      />
                      <TextField
                        label="Provincia"
                        variant="outlined"
                        size="small"
                        sx={{ flexGrow: 1 }}
                        value={payload.cliente.provincia}
                        onChange={handleSetPayload}
                        name="provincia"
                      />
                      <TextField
                        label="Código postal"
                        variant="outlined"
                        size="small"
                        value={payload.cliente.codigoPostal}
                        onChange={handleSetPayload}
                        name="codigoPostal"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <hr />
              <Stack direction="row" spacing={1}>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleCancelCheckout}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  type="submit"
                >
                  Confirmar y realizar compra
                </Button>
              </Stack>
            </form>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Checkout;
