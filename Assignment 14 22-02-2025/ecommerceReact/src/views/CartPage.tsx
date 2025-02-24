//Leaving these lines commented out for now. commented lines represent the functionality of retrieving cart details from the fakestoreapi, but now i am showing the cart details from the context

import { useContext } from "react";
import Navbar from "../components/Navbar";
// import { fetchCart } from "../api/Api";                  
// import { ICart } from "../models/Cart";
import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import { cartContext } from "../context/CartContext";

const CartPage = () => {
  // const [cart, setCart] = useState<ICart[]>();
  const { state, dispatch } = useContext(cartContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchCart(1);
  //     setCart(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 2, width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h3" gutterBottom>
          Cart Products
        </Typography>
        {/* <Grid container spacing={3} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
          {cart?.map((cartItem) => (
            <Grid container spacing={2} sx={{ mt: 1 }} key={cartItem.id}>
              {cartItem.products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`${product.productId}-${index}`}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body1">Product ID: {product.productId}</Typography>
                      <Typography variant="body2">Quantity: {product.quantity}</Typography>
                      <Box mt={1}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            const updatedCart = cart?.map((item) => {
                              if (item.id === cartItem.id) {
                                return {
                                  ...item,
                                  products: item.products.map((p, i) =>
                                    i === index
                                      ? {
                                          ...p,
                                          quantity: Math.max(0, p.quantity - 1),
                                        }
                                      : p
                                  ),
                                };
                              }
                              return item;
                            });
                            updateCart(cartItem.id, product.productId, product.quantity - 1);
                            setCart(updatedCart);
                          }}
                        >
                          Delete Product
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid> */}

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>

        </Typography>
        <Grid container spacing={2} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          {state.cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.product.id}>
              <Card sx={{ display: "flex", flexDirection:"column",alignItems: "center", height:"100%" }}>
         

                <Box sx={{ flex: "0 0 150px", mr: 2 }}>
                  <img
                    src={item.product.image||""}
                    alt={item.product.title||""}
                    style={{height: "auto",width:"150px", objectFit: "contain" }}
                    />
                </Box>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.product.title}</Typography>
                  <Typography variant="body1">Price: ${item.product.price}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 1,mb:0 }}
                    onClick={() => {
                      if (item.product.id !== null) {
                        dispatch({ type: "DELETE_FROM_CART", payload: { productId: item.product.id } });
                      }
                    }}
                    >
                    Remove
                  </Button>
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