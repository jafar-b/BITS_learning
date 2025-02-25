import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/Api";
import { Card, CardContent, CardMedia, Typography, Box, Rating, Button } from "@mui/material";
import { Product } from "../models/Product";
import { useContext } from "react";
import { cartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { dispatch } = useContext(cartContext);
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(Number(id)),
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <h2>Loading...</h2>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <h2>Error loading product details</h2>
      </>
    );
  }

  const product: Product = data;

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: { product: product } });
    alert(`Product Added to Cart ${JSON.stringify(product)}`)
   
  };

  return (
    <>
      <Navbar />
      <Card sx={{ maxWidth: 400, mx: "auto", my: 4, p: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="250"
          image={product.image || 'https://via.placeholder.com/150'}
          alt={product.title || 'Product image'}
          sx={{ objectFit: "contain", borderRadius: 2 }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="subtitle1" color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Rating value={product.rating?.rate ?? 0} precision={0.1} readOnly />
            <Typography variant="body2" ml={1}>
              ({product.rating?.count ?? 0} reviews)
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductDetails;