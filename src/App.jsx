/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Fade,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import NavBar from "./components/NavBar";
import { ShoppingBag as ShoppingBagIcon } from "@mui/icons-material";

const fakeData = new Promise((resolve, reject) =>
  setTimeout(
    () => resolve(["Lentes oftálmicos", "Lentes de sol", "Micas graduadas"]),
    300
  )
);

const CustomCounter = ({ value = 0, setValue }) => {
  const handleCount = (sign) =>
    setValue(sign === "+" ? value + 1 : value - (value > 0 ? 1 : 0));

  return (
    <>
      {value === 0 ? (
        <Button
          variant="outlined"
          color="primary"
          endIcon={<ShoppingBagIcon />}
          onClick={() => handleCount("+")}
        >
          Agregar al carrito
        </Button>
      ) : (
        <Fade in={value > 0} timeout={1000}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="button" sx={{ mx: 2 }}>
              En cesta
            </Typography>
            <IconButton onClick={() => handleCount("-")} size="small">
              <Avatar variant="rounded">{"-"}</Avatar>
            </IconButton>
            <Typography variant="button" sx={{ mx: 2 }}>
              {value}
            </Typography>
            <IconButton onClick={() => handleCount("+")} size="small">
              <Avatar variant="rounded">{"+"}</Avatar>
            </IconButton>
          </Box>
        </Fade>
      )}
    </>
  );
};

function App() {
  const splashRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countExample, setCountExample] = useState(0);
  const [menuItems, setMenuItems] = useState([]);

  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    fakeData.then((data) => setMenuItems(data));
  }, []);

  return (
    <>
      <Box
        sx={{ backgroundColor: "#000", color: "#fff", textAlign: "center" }}
        ref={splashRef}
      >
        <Typography variant="caption">
          ¡Ofertas especiales todos los días!
        </Typography>
      </Box>
      <Grid container>
        {menuOpen && (
          <Grid item xs={6} md={3}>
            <Fade in={menuOpen} timeout={1000}>
              <Paper
                elevation={3}
                sx={{
                  height: `calc(100vh - ${splashRef.current.offsetHeight}px)`,
                  backgroundColor: "#1f1f1f",
                  color: "#fff",
                }}
                square={true}
              >
                <Container>
                  <Typography variant="h5" sx={{ p: 2, color: "#c1c1c1", textShadow: "0px 5px 10px rgb(50, 50, 0)" }}>
                    Menú
                  </Typography>
                  <hr />
                  {menuItems.map((item, index) => (
                    <Typography variant="body1" sx={{ p: 1 }} key={index}>
                      {item}
                    </Typography>
                  ))}
                </Container>
              </Paper>
            </Fade>
          </Grid>
        )}
        <Grid item xs={menuOpen ? 6 : 12} md={menuOpen ? 9 : 12}>
          <NavBar
            menuOpen={menuOpen}
            handleMenuOpen={handleMenuOpen}
            shoppingCartCount={countExample}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>
                ¡Bienvenido a la tienda!
              </Typography>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <CustomCounter
                  value={countExample}
                  setValue={setCountExample}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
