import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import CartPage from "./views/CartPage";
import UserOperations from "./views/ProductsCrud";
import Login from "./views/Login";
import ProductsCrud from "./views/ProductsCrud";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CategoriesPage from "./views/CategoriesPage";
import { CategoryProvider } from "./context/CategoryContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./views/ProductDetails";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <CategoryProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/user-operations" element={<UserOperations />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/productscrud" element={<ProductsCrud />} />
                  </Route>
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/productdetails/:id" element={<ProductDetails/>} />
                  <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
              </Router>
            </CategoryProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
