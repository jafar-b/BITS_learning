import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import Navbar from '../components/Navbar';

const ProductOperation = () => {
  const [operation, setOperation] = useState('');
  const [formValues, setFormValues] = useState({
    // For add, no productId is provided.
    // For edit and delete, productId is required.
    productId: '',
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const handleOperationChange = (e:SelectChangeEvent<string>) => {
    setOperation(e.target.value);
    // Reset form on operation change.
    setFormValues({
      productId: '',
      title: '',
      price: '',
      description: '',
      image: '',
      category: '',
    });
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would call your API or dispatch actions based on operation and formValues.
    console.log('Operation:', operation, formValues);
  };

  return (
    <>
    
    <Navbar/>
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3,  boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Select Operation
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="operation-label">Operation</InputLabel>
        <Select
          labelId="operation-label"
          value={operation}
          label="Operation"
          onChange={handleOperationChange}
          >
          <MenuItem value="add">Add Product</MenuItem>
          <MenuItem value="edit">Edit Product</MenuItem>
          <MenuItem value="delete">Delete Product</MenuItem>
        </Select>
      </FormControl>

      {operation && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* For Edit and Delete, include productId field */}
          {(operation === 'edit' || operation === 'delete') && (
            <TextField
            fullWidth
            label="Product ID"
            name="productId"
            value={formValues.productId}
            onChange={handleChange}
            margin="normal"
            required
            />
          )}

          {operation !== 'delete' && (
            <>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                margin="normal"
                required={operation === 'edit'} // For add, you may decide if required
                />
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formValues.price}
                onChange={handleChange}
                margin="normal"
                required={operation === 'edit'}
                />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                required={operation === 'edit'}
                />
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formValues.image}
                onChange={handleChange}
                margin="normal"
                required={operation === 'edit'}
                />
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                margin="normal"
                required={operation === 'edit'}
                />
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" type="submit">
              {operation === 'add'
                ? 'Add Product'
                : operation === 'edit'
                ? 'Update Product'
                : 'Delete Product'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
      </>
  );
};

export default ProductOperation;
