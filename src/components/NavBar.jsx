/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  ShoppingCartRounded as ShoppingCartIcon,
} from "@mui/icons-material";
import SonoptikaIcon from "../assets/3.png";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const NavBar = ({ menuOpen, handleMenuOpen }) => {
  const { carrito } = useContext(GlobalContext);
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        background:
          "linear-gradient(90deg, rgba(134,44,139,1) 0%, rgba(243,113,70,1) 60%, rgba(255,229,0,1) 100%)",
        maxHeight: "4rem",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
        }}
      >
        <IconButton
          sx={{ display: "flex", mr: 1, color: "#fff" }}
          size="large"
          color="inherit"
          onClick={handleMenuOpen}
        >
          {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Link to="/">
          <img
            src={SonoptikaIcon}
            style={{
              display: "flex",
              m: "auto",
              maxHeight: "100%",
              width: "5rem",
            }}
          />
        </Link>
        <Button
          color="primary"
          variant="filled"
          startIcon={<ShoppingCartIcon />}
          sx={{ display: "flex", ml: "auto", color: "#1c1c1" }}
        >
          {carrito.reduce((acc, obj) => acc + obj?.cantidad, 0)}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
