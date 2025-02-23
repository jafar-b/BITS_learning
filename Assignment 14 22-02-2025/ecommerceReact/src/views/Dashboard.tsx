import  { useEffect, useState } from 'react';
import { fetchProducts } from '../api/Api';
import { Product } from '../models/Product';
import DisplayProducts from '../components/Products';
import Navbar from '../components/Navbar';
import { Box, Button } from '@mui/material';
import SelectCategory from '../components/SelectCategory';

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);             // 0 for first half, 1 for second half

  useEffect(() => {
    fetchProducts().then((data) => {
      if (data) {
        setProducts(data);
      }
    });
  }, []);

  const mid = Math.floor(products.length / 2);
  const slicedArray1: Product[] = products.slice(0, mid);
  const slicedArray2: Product[] = products.slice(mid);

  const handleNext = () => {
    setPage(1);
  };

  const handlePrevious = () => {
    setPage(0);
  };

  const currentProducts = page === 0 ? slicedArray1 : slicedArray2;

  return (
    <>
      <Navbar />

<SelectCategory/>


      <Box sx={{ p: 2 }}>
      
        <DisplayProducts products={currentProducts} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', my:2}}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePrevious} 
          disabled={page === 0}
          sx={{ mx: 1 }}
        >
          Previous
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNext} 
          disabled={page === 1}
          sx={{ mx: 1 }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
