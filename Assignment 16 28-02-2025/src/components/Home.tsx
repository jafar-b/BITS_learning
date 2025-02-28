import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { fetchProducts, Product } from "../api/Api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
const Home = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  const categories = useMemo(() => {
    if (!products) return [];
    return [
      "all",
      ...new Set(products.map((p: Product) => p.category)),
    ] as string[];
  }, [products]);

const addToCart=useCartStore((state:any)=>state.addToCart)


  useEffect(() => {
    if (products) {
      let filtered = [...products];

      if (selectedCategory !== "all") {
        filtered = filtered.filter((p) => p.category === selectedCategory);
      }

      filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.price - b.price;
        } else if (sortOrder === "desc") {
          return b.price - a.price;
        }
        return 0;
      });

      setSortedProducts(filtered);
    }
  }, [products, sortOrder, selectedCategory]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading products.</Text>;

  return (
    <>
      <Flex justifyContent="flex-end" mb={4} gap={2}>
        <HStack>
          <Menu>
            <MenuButton as={Button} value={selectedCategory} width="fit-content">
            {selectedCategory +  " Category" }<ChevronDownIcon />
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <MenuItem
                  key={category as string}
                  onClick={() => setSelectedCategory(category as string)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button}>
              Sort by Price <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSortOrder("asc")}>
                Low to High
              </MenuItem>
              <MenuItem onClick={() => setSortOrder("desc")}>
                High to Low
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <Flex
        padding={4}
        justifyContent="flex-start"
        alignItems="start"
        minH="100vh"
        flexWrap="wrap"
        gap={4}
      >
        {sortedProducts.map((product) => (
          <Box
            key={product.id}
            bgColor="white"
            p={4}
            borderRadius="lg"
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            width={{ base: "100%", sm: "45%", md: "30%", lg: "23%" }}
            height="350px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}
          >
            <Box>

            <Box
            
          onClick={() => navigate(`/product/${product.id}`)}
              height="150px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              >
              <Image
                src={product.image || ""}
                alt={product.title || ""}
                maxH="140px"
                objectFit="contain"
                />
            </Box>

            <VStack gap={2} align="start" flex="1" 
          onClick={() => navigate(`/product/${product.id}`)}>
              <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                {product.title}
              </Text>
              <Text color="gray.600" fontSize="sm" noOfLines={2}>
                {product.description}
              </Text>
              <Text color="green.600" fontSize="lg" fontWeight="bold">
                ${product.price}
              </Text>
            </VStack>
        </Box>
              <Button colorScheme="blue" width="full" size="sm" onClick={()=>{addToCart(product)} }>
                Add to Cart
              </Button>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default Home;
