import { useState } from "react";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/react";
import { Box, Input, Heading, VStack, Button } from "@chakra-ui/react";
import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { useQueryClient } from "@tanstack/react-query";
import { addProduct, editProduct, deleteProduct, Product } from "../api/Api";
import { useMutation } from "@tanstack/react-query";

const ProductCrud = () => {
  const [operation, setOperation] = useState("");
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState<Product>({
    productId: null,
    title: "",
    price: null,
    description: "",
    image: "",
    category: "",
    quantity: null,
    id: null,
    rating: {
      rate: null,
      count: null,
    },
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product added successfully");
    },
    onError: () => {
      alert("Error adding product");
    },
  });

  const editMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product deleted successfully");
    },
  });

  const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
    setFormValues({
      productId: null,
      title: "",
      price: null,
      description: "",
      image: "",
      category: "",
      quantity: null,
      id: null,
      rating: {
        rate: null,
        count: null,
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      switch (operation) {
        case "add":
          await addMutation.mutateAsync(formValues);
          break;
        case "edit":
          if (formValues.id) {
            await editMutation.mutateAsync(formValues);
          } else {
            alert("Product ID is required for editing");
          }
          break;
        case "delete":
          if (formValues.id) {
            await deleteMutation.mutateAsync(formValues.id);
          } else {
            alert("Product ID is required");
          }
          break;
      }
    } catch (error) {
      alert("Operation failed");
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="lg" borderRadius="lg">
      <Heading size="lg" mb={6}>
        Product Operations
      </Heading>

      <FormControl mb={6}>
        <FormLabel>Select Operation</FormLabel>
        <Select value={operation} onChange={handleOperationChange}>
          <option value="">Select operation</option>
          <option value="add">Add Product</option>
          <option value="edit">Edit Product</option>
          <option value="delete">Delete Product</option>
        </Select>
      </FormControl>

      {operation && (
        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            {(operation === "edit" || operation === "delete") && (
              <FormControl isRequired>
                <FormLabel>Product ID</FormLabel>
                <Input
                  name="id"
                  value={formValues.id || ""}
                  onChange={handleChange}
                />
              </FormControl>
            )}

            {operation !== "delete" && (
              <>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={formValues.title || ""}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    type="number"
                    value={formValues.price || ""}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formValues.description || ""}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    name="image"
                    value={formValues.image || ""}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Input
                    name="category"
                    value={formValues.category || ""}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={
                addMutation.isPending ||
                editMutation.isPending ||
                deleteMutation.isPending
              }
            >
              {operation === "add"
                ? "Add Product"
                : operation === "edit"
                ? "Update Product"
                : "Delete Product"}
            </Button>
          </VStack>
        </form>
      )}
    </Box>
  );
};

export default ProductCrud;
