import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { state,dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    navigate("/login");
    dispatch({ type: "LOGOUT" });
  };



  return (
    <AppBar position="static" sx={{ margin: 0, padding: 0 }}>
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Jafar's E-Commerce Website
        </Typography>

        <Button
          color="inherit"
          sx={{ marginRight: 4 }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
                <Button
          color="inherit"
          sx={{ marginRight: 4 }}
          onClick={() => navigate("/categories")}
        >
          Categories
        </Button>

        {state.isAdmin && 
          <Button
          color="inherit"
          sx={{ marginRight: 4 }}
          onClick={() => navigate("/productscrud")}
          >
          Products-CRUD
        </Button>
        }

        <IconButton
          color="inherit"
          sx={{ marginRight: 4 }}
          onClick={() => navigate("/cart")}
        >
          <ShoppingCartIcon />
        </IconButton>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
