import React, { useState } from "react";
import { addProduct, editProduct, deleteProduct } from "../api/Api";
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
} from "@mui/material";
import Navbar from "../components/Navbar";
import { Product } from "../models/Product";

const ProductCrud = () => {
  const [operation, setOperation] = useState("");
  const [formValues, setFormValues] = useState<Product>({
    productId: null,
    title: "",
    price: null,
    description: "",
    image: "",
    category: "",
    quantity: null,
    id: null,
    rating:{
      rate:null,
      count:null
    }
  });

  const handleOperationChange = (e: SelectChangeEvent<string>) => {
    setOperation(e.target.value);
    // Reset form on operation change.
    setFormValues({
      productId: null,
      title: "",
      price: null,
      description: "",
      image: "",
      category: "",
      quantity: null,
      id: null, rating:{
        rate:null,
        count:null
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form values:", formValues);

    try {
      switch (operation) {
        case "add":
          const res = await addProduct(formValues);
          alert(`Product added successfully:${JSON.stringify(res)}`);
          break;
        case "edit":
          if (formValues.id) {
            const res = await editProduct(formValues);
            alert(`Product updated successfully:${JSON.stringify(res)}`);
          } else {
            alert("Product ID is required for editing.");
          }
          break;
        case "delete":
          if (formValues.id) {
            const res = await deleteProduct(formValues.id);
            alert(`Product deleted successfully:${JSON.stringify(res)}`);
          } else {
            alert("Product ID is required");
          }
          break;
        default:
          break;
      }
    } catch (error) {
      alert("Please try again");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{ maxWidth: 600, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}
      >
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
            {(operation === "edit" || operation === "delete") && (
              <TextField
                fullWidth
                label="Product ID"
                name="id"
                value={formValues.id || ""}
                onChange={handleChange}
                margin="normal"
                required
              />
            )}

            {operation !== "delete" && (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formValues.title || ""}
                  onChange={handleChange}
                  margin="normal"
                  required={operation === "edit"}
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formValues.price || ""}
                  onChange={handleChange}
                  margin="normal"
                  required={operation === "edit"}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formValues.description || ""}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={3}
                  required={operation === "edit"}
                />
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formValues.image || ""}
                  onChange={handleChange}
                  margin="normal"
                  required={operation === "edit"}
                />
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={formValues.category || ""}
                  onChange={handleChange}
                  margin="normal"
                  required={operation === "edit"}
                />
              </>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" type="submit">
                {operation === "add"
                  ? "Add Product"
                  : operation === "edit"
                  ? "Update Product"
                  : "Delete Product"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProductCrud;
