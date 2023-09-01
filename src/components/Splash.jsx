import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

import { Box, Typography } from "@mui/material";

const Splash = () => {
  const {splashRef} = useContext(GlobalContext);
  
  return (
    <Box
      sx={{ backgroundColor: "#000", color: "#fff", textAlign: "center" }}
      ref={splashRef}
    >
      <Typography variant="caption">
        ¡Ofertas especiales todos los días!
      </Typography>
    </Box>
  );
};

export default Splash;
