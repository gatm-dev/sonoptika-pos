/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */

import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Fade,
} from "@mui/material";
import NavBar from "./components/NavBar";

import Carousel from "./components/Carousel";

function App() {
  const splashRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

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
                square
              >
                <Container>
                  <Typography
                    variant="h5"
                    sx={{
                      p: 2,
                      color: "#c1c1c1",
                      textShadow: "0px 5px 10px rgb(50, 50, 0)",
                    }}
                  >
                    Menú
                  </Typography>
                  <hr />
                </Container>
              </Paper>
            </Fade>
          </Grid>
        )}
        <Grid item xs={menuOpen ? 6 : 12} md={menuOpen ? 9 : 12}>
          <NavBar
            menuOpen={menuOpen}
            handleMenuOpen={handleMenuOpen}
          />
          <Container sx={{p: 2}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Carousel />
            </Grid>
          </Grid>
          </Container>
        </Grid>
        
      </Grid>
    </>
  );
}

export default App;
