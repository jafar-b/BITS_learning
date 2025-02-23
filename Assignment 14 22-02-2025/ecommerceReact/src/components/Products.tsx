
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Product } from '../models/Product';

const DisplayProducts = ( {products}:{products:Product[]} ) => {
  function handleAddToCart(): void {


  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt="loading image"
              sx={{
                objectFit: 'contain',
                maxHeight: 150,
                p: 2,
                backgroundColor: '#f5f5f5',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" noWrap gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ${product.price}
              </Typography>
            </CardContent>
            <Button variant="contained" onClick={handleAddToCart} sx={{ m: 2 }}>
        Add to Cart
      </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayProducts;
