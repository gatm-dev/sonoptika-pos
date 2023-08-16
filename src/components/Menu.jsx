/* eslint-disable react/prop-types */
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  Typography,
  Container,
  Paper,
  Fade,
  List,
  ListSubheader,
  Link,
  ListItem,
} from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

const Menu = ({ menuOpen }) => {
  const { splashRef, tipoProductos } = useContext(GlobalContext);
  return (
    <Fade in={menuOpen} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          height: `calc(100vh - ${splashRef?.current?.offsetHeight || 0}px)`,
          backgroundColor: "#1f1f1f",
          color: "#fff",
          position: "sticky",
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
          <List
            subheader={
              <ListSubheader
                sx={{
                  backgroundColor: "#1f1f1f",
                  color: "#fff",
                }}
              >
                Categorías
              </ListSubheader>
            }
            component="nav"
            sx={{
              color: "#c1c1c1",
              textShadow: "0px 5px 10px rgb(50, 50, 0)",
            }}
          >
            {tipoProductos?.map((tipoProducto) => (
              <ListItem key={tipoProducto?.IdTipoProducto}>
                <Link
                  component={LinkRouter}
                  to={`/productos/${tipoProducto?.TipoProducto}`}
                  sx={{ color: "#c1c1c1" }}
                  variant="body2"
                >
                  {tipoProducto?.TipoProducto}
                </Link>
              </ListItem>
            ))}
          </List>
        </Container>
      </Paper>
    </Fade>
  );
};

export default Menu;
