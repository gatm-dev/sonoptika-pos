/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */

import { useState, useContext } from "react";
import { Grid, Container } from "@mui/material";

import Splash from "./components/Splash";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import { Outlet } from "react-router-dom";

import { GlobalContext } from "./context/GlobalContext";

function App() {
  const { splashRef } = useContext(GlobalContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

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
        >
          <NavBar menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />
          <Container sx={{ p: 2 }}>
            <Outlet /> {/* Outlet para <Productos /> */}
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
