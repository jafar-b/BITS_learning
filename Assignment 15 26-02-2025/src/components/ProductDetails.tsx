import { useQuery } from "@tanstack/react-query";
import {  useParams } from "react-router-dom";
import { fetchProduct } from "../api/Api";
import { 
  Box, 
  Image, 
  Text, 
  VStack, 
  Heading, 
  Container,
  Flex,
  Badge,
  Icon
} from "@chakra-ui/react";
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  console.log("ProductDetails rendered with id:", id);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      console.log("Fetching product with id:",id);
      return fetchProduct(Number(id));
    },

  });
console.log(product);

  if (isLoading) {
    return (
      <Heading size="lg" textAlign="center" mt={8}>Loading...</Heading>
    );
  }

  if (isError) {
    return (
      <Heading size="lg" textAlign="center" mt={8} color="red.500">
        Error loading product details
      </Heading>
    );
  }

  return (
    <>

    <Container maxW="container.md" py={8}>

      <Box 
        maxW="2xl" 
        mx="auto" 
        bg="white" 
        borderRadius="lg" 
        boxShadow="lg" 
        overflow="hidden"
      >
        
        <Image
          src={product.image || 'https://via.placeholder.com/150'}
          alt={product.title}
          height="300px"
          width="100%"
          objectFit="contain"
          p={4}
        />
    
        <VStack gap={4} p={6} align="stretch">
          <Heading size="lg">{product.title}</Heading>
    
          <Text color="gray.600">{product.description}</Text>
    
          <Heading size="lg" color="blue.500">
            ${product.price}
          </Heading>
    
          <Badge colorScheme="green" alignSelf="start">
            {product.category}
          </Badge>
          
          <Flex align="center">
          <Flex>


          {Array(5).fill("").map((_, i) => (
  <Icon
    key={i}
    as={FaStar}
    color={i < Math.round(product.rating?.rate || 0) ? "yellow.400" : "gray.300"}
  />
))}

            </Flex>
            <Text ml={2} color="gray.600">
              ({product.rating?.count ?? 0} reviews)
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Container>
    </>
  );
};

export default ProductDetails; 