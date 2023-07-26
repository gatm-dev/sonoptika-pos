/* eslint-disable react/prop-types */

import { AppBar, Container, Toolbar, IconButton, Button } from "@mui/material";
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  ShoppingCartRounded as ShoppingCartIcon,
} from "@mui/icons-material";
import SonoptikaIcon from "../assets/3.png";
import SonoptikaGradient from "../assets/DEGRADADO1.png";

const NavBar = ({ menuOpen, handleMenuOpen, shoppingCartCount }) => {
  return (
    <AppBar position="static" elevation={0} color="inherit" sx={{background: `url(${SonoptikaGradient})`}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            sx={{ display: "flex", mr: 1, color: "#fff" }}
            size="large"
            color="inherit"
            onClick={handleMenuOpen}
          >
            {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <IconButton
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            size="large"
            color="inherit"
          >
            <img src={SonoptikaIcon} style={{maxHeight: "100%", width: "4rem"}} />
          </IconButton>
          <Button
            color="primary"
            variant="filled"
            startIcon={<ShoppingCartIcon />}
            sx={{ display: "flex", ml: "auto", color: "#1c1c1" }}
            disabled={shoppingCartCount === 0}
          >
            <span style={{color: "#fff"}}>{shoppingCartCount > 0 && shoppingCartCount}</span>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
