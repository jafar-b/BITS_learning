import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchCart } from "../api/Api";
import { ICart } from "../models/Cart";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

const CartPage = () => {
  const [cart, setCart] = useState<ICart[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCart(1);
      setCart(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h3" gutterBottom>
          Cart
        </Typography>
        <Grid container spacing={3}>
          {cart?.map((cartItem) => (
            <Grid item xs={12} key={cartItem.id}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Cart ID: {cartItem.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Date: {new Date(cartItem.date).toLocaleDateString()}
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {cartItem.products.map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product.productId}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="body1">
                              Product ID: {product.productId}
                            </Typography>
                            <Typography variant="body2">
                              Quantity: {product.quantity}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CartPage;
