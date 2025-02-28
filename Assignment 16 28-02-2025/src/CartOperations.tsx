import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllCarts,
  fetchCartById,
  deleteCart,
  addCart,
} from "./api/Api";
import { Box, Button, Input, VStack, Text, HStack } from "@chakra-ui/react";
import { ICart } from "./models/ICart";
import { Product } from "./models/Product";

export const CartOperations = () => {
  const [cartId, setCartId] = useState<number | null>(null);
  const [deleteCartId, setDeleteCartId] = useState<number | null>(null);
  const [cartsDisplay, setCartsDisplay] = useState(false);
  const [newCart, setNewCart] = useState<ICart>({
    id: null,
    userId: null,
    date: new Date(),
    products: [],
  });

  const queryClient = useQueryClient();

  const {
    data: carts,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["carts"], queryFn: fetchAllCarts });

  const handleFetchAllCarts = () => setCartsDisplay(!cartsDisplay);

  const {
    data: cartById,
    isError: isErrorCartById,
  } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => (cartId !== null ? fetchCartById(cartId) : Promise.reject()),
    enabled: !!cartId,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      alert("Cart deleted successfully!");
    },
  });

  const addMutation = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      alert("New Cart Added!");
    },
  });

  const handleAddCart = () => {
    if (!newCart.userId || newCart.products?.length === 0) {
      alert("Please enter a User ID and add at least one product.");
      return;
    }
    addMutation.mutate(newCart);
    setNewCart({ id: null, userId: null, date: new Date(), products: [] });
  };

  const handleDeleteCart = () => {
    if (deleteCartId !== null) deleteMutation.mutate(deleteCartId);
  };

  const handleAddProduct = () => {
    setNewCart((prevCart) => ({
      ...prevCart,
      products: [
        ...(prevCart.products || []),
        { productId: "", quantity: "" } as unknown as Product,
      ],
    }));
  };

  const handleProductChange = (index: number, key: keyof Product, value: string) => {
    setNewCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products?.map((product, i) =>
        i === index ? { ...product, [key]: value } : product
      ) || [],
    }));
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl">Cart Operations</Text>

      <Button colorScheme="green" my={4} onClick={handleFetchAllCarts}>
        {cartsDisplay ? "Hide Carts" : "Fetch All Carts"}
      </Button>

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error loading carts</Text>}

      {cartsDisplay && carts && (
        <VStack spacing={4}>
          {carts.map((cart: any) => (
            <Box key={cart.id} borderWidth="1px" borderRadius="lg" p={4}>
              <Text>Cart ID: {cart.id}</Text>
              <Text>User ID: {cart.userId}</Text>
              <Text>Date: {cart.date}</Text>
            </Box>
          ))}
        </VStack>
      )}

      <Box mt={4}>
        <Text my={4}>Get Cart by ID</Text>
        <Input
          placeholder="Enter Cart ID"
          type="number"
          value={cartId || ""}
          onChange={(e) => setCartId(Number(e.target.value))}
        />

        {isErrorCartById && <Text>Error fetching cart</Text>}
        {cartById && (
          <Box my={4}>
            <Text>Cart ID: {cartById.id}</Text>
            <Text>User ID: {cartById.userId}</Text>
            <Text>Date: {cartById.date}</Text>
          </Box>
        )}
      </Box>

      <hr />

      <Text my={4}>Add a New Cart</Text>
      <VStack spacing={4}>
        <Input
          placeholder="User ID"
          type="number"
          value={newCart.userId || ""}
          onChange={(e) =>
            setNewCart((prev) => ({ ...prev, userId: Number(e.target.value) }))
          }
        />
        <Input
          placeholder="Date"
          type="date"
          value={newCart.date.toISOString().split("T")[0]}
          onChange={(e) =>
            setNewCart((prev) => ({ ...prev, date: new Date(e.target.value) }))
          }
        />

        {newCart.products?.map((product, index) => (
          <HStack key={index} spacing={2}>
            <Input
              placeholder="Product ID"
              type="number"
              value={product.productId!}
              onChange={(e) => handleProductChange(index, "productId", e.target.value)}
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={product.quantity||1}
              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
            />
          </HStack>
        ))}

        <Button colorScheme="blue" onClick={handleAddProduct}>
          Add Product
        </Button>
        <Button colorScheme="green" px={2} mb={4} onClick={handleAddCart}>
          Add New Cart
        </Button>
      </VStack>

      <hr />

      <Text my={4}>Delete Cart</Text>
      <Input
        placeholder="Enter Cart ID"
        type="number"
        value={deleteCartId || ""}
        onChange={(e) => setDeleteCartId(Number(e.target.value))}
      />
      <Button my={4} colorScheme="red" onClick={handleDeleteCart}>
        Delete Cart
      </Button>
    </Box>
  );
};

export default CartOperations;
