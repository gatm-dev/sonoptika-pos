import { useContext } from "react";
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
    defArm,
    confirmCheckout,
    setConfirmCheckout,
    handleVaciarCarrito,
  } = useContext(GlobalContext);

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
                      <Counter item={defArm.IdProducto} />
                    </Stack>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item>
              <h3>
                Total:{" "}
                {carrito.reduce((acc, item) => acc + item?.PrecioVenta, 0)}
              </h3>
            </Grid>
            <Grid item>
              {!confirmCheckout && (
                <Stack direction={"row"} spacing={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      handleVaciarCarrito();
                      navigate("/");
                    }}
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
            {compraId && (
              <Grid item xs={12}>
                <h3>Compra realizada con éxito</h3>
                <p>Id de compra: {compraId}</p>
              </Grid>
            )}
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
                    />
                    <TextField
                      label="Apellido Materno"
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      label="Nombre"
                      variant="outlined"
                      size="small"
                      sx={{ flexGrow: 1 }}
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
                    />
                    <TextField
                      label="Teléfono"
                      variant="outlined"
                      size="small"
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
                      />
                      <TextField
                        label="Provincia"
                        variant="outlined"
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                      <TextField
                        label="Código postal"
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <hr />
              <Button variant="contained" color="warning" fullWidth>
                Confirmar y realizar compra
              </Button>
            </form>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Checkout;
