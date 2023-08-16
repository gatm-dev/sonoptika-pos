/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  ShoppingCartRounded as ShoppingCartIcon,
} from "@mui/icons-material";
import SonoptikaIcon1 from "../assets/3.png";
import SonoptikaIcon2 from "../assets/VARIANTE-LOGO-1.png";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const NavBar = ({ menuOpen, handleMenuOpen }) => {
  const { carrito, changeScrollColor } = useContext(GlobalContext);
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        background: changeScrollColor
          ? "rgba(150, 150, 150, 0.8)"
          : "linear-gradient(90deg, rgba(134,44,139,1) 0%, rgba(243,113,70,1) 60%, rgba(255,229,0,1) 100%)",
        transition: "background 0.5s ease-in-out",
        maxHeight: "4rem",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
            src={changeScrollColor ? SonoptikaIcon2 : SonoptikaIcon1}
            style={{
              display: "flex",
              m: "auto",
              maxHeight: "100%",
              width: changeScrollColor ? "3rem" : "5rem",
            }}
          />
        </Link>
        <Button
          color="primary"
          variant="filled"
          startIcon={<ShoppingCartIcon />}
          sx={{
            display: "flex",
            ml: changeScrollColor ? "auto" : "none",
            color: changeScrollColor ? "#fff" : "#1c1c1",
          }}
        >
          {carrito.reduce((acc, obj) => acc + obj?.cantidad, 0)}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
