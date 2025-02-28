import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductCrud from "./components/ProductCrud";
import ProductDetails from "./components/ProductDetails";
import ProtectedRoute from "./controllers/ProtectedRoute"
import Login from "./Login";
import CartOperations from "./CartOperations";
import ProtectedAdminRoute from "./controllers/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Flex h="100vh" direction="column">
        <Navbar />
        <Flex flex={1} overflow="auto">
          <Sidebar />
          <Box 
            ml="40px" 
            w="calc(100% - 60px)" 
            p={4}
            overflowY="auto"
          >
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route element={<ProtectedAdminRoute/>}>
              <Route path="/cartoperations" element={<CartOperations />} />
              <Route path="/productscrud" element={<ProductCrud />} />
              
              </Route>
              <Route  element={<ProtectedRoute/>}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              </Route>
            </Routes>
          </Box>
        </Flex>
      </Flex>
    </BrowserRouter>
  );
}

export default App;