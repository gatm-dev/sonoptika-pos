/* eslint-disable react/prop-types */

import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  ShoppingCartRounded as ShoppingCartIcon,
} from "@mui/icons-material";
import SonoptikaIcon from "../assets/3.png";

const NavBar = ({ menuOpen, handleMenuOpen }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="inherit"
      sx={{
        background:
          "linear-gradient(90deg, rgba(134,44,139,1) 0%, rgba(243,113,70,1) 60%, rgba(255,229,0,1) 100%)",
          maxHeight: "4rem"
      }}
    >
      <Toolbar disableGutters>
        <IconButton
          sx={{ display: "flex", mr: 1, color: "#fff" }}
          size="large"
          color="inherit"
          onClick={handleMenuOpen}
        >
          {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <img src={SonoptikaIcon} style={{ maxHeight: "100%", width: "5rem" }} />
        <Button
          color="primary"
          variant="filled"
          startIcon={<ShoppingCartIcon />}
          sx={{ display: "flex", ml: "auto", color: "#1c1c1" }}
        >
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
