/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */

import { useState, useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

import { Outlet } from "react-router-dom";
import { Grid, Container, Typography, Box } from "@mui/material";

import "./App.css";
import SonoptikaLogo from "./assets/VARIANTE-LOGO-1.png";

import Splash from "./components/Splash";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";

function App() {
  const { splashRef, containerRef, loading } = useContext(GlobalContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  if (loading)
    return (
      <Container
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Box
          component={"img"}
          src={SonoptikaLogo}
          sx={{ width: "10vw", height: "auto" }}
          className="App-logo"
        />

        <Typography variant="h6">Cargando</Typography>
      </Container>
    );

  return (
    <>
      <Splash />
      <Grid container sx={{ maxHeight: "100vh" }}>
        {menuOpen && (
          <Grid item xs={6} md={3}>
            <Menu menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />
          </Grid>
        )}
        <Grid
          item
          xs={menuOpen ? 6 : 12}
          md={menuOpen ? 9 : 12}
          sx={{
            height: `calc(100vh - ${splashRef?.current?.offsetHeight || 0}px)`,
            overflow: "scroll",
          }}
          ref={containerRef}
        >
          <NavBar menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />
          <Container sx={{ p: 2 }}>
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
