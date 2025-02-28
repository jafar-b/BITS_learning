
import { Box, Button, Image, Text, VStack, HStack } from '@chakra-ui/react';
import { useCartStore } from '@/store/cartStore';
const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <Box p={4}>
      {cart.length === 0 ? (
        <Text fontSize="2xl">Empty Cart</Text>
      ) : (
        <VStack spacing={4}>
          {cart.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} width="100%">
              <HStack spacing={4}>
                <Image boxSize="100px" src={product.image ||""} alt={product.title||""} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{product.title}</Text>
                  <Text>${product.price}</Text>
                  <Text>{product.description}</Text>
                  <Button colorScheme="red" onClick={() => removeFromCart(Number(product.id))}>Remove from Cart</Button>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Cart;