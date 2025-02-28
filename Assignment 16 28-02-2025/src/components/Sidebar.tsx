import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Flex, 
  IconButton, 
  VStack, 
  Text, 
  Icon 
} from "@chakra-ui/react";
import { FiMenu, FiX, FiHome, FiShoppingCart, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex >
      
      <Box
        as="nav"
        w={isOpen ? "200px" : "60px"}
        h="100%"
        bg="gray.800"
        color="white"
        transition="width 0.3s"
        overflow="hidden"
        position="sticky"
        p={4}
      >
        <VStack align="start" gap={4} w="full">
          <IconButton
            aria-label="Toggle Sidebar"
            onClick={() => setIsOpen(!isOpen)}
            colorScheme="blackAlpha"
            size="sm"
            
            >
              {isOpen ? <FiX/> : <FiMenu/>}
            </IconButton>

          <VStack align="start" gap={4} w="full">
            <Link to="/">
              <Flex align="center">
                <Icon as={FiHome} />
                {isOpen && <Text ml={2}>Home</Text>}
              </Flex>
            </Link>
            <Link to="/cart">
              <Flex align="center">
                <Icon as={FiShoppingCart} />
                {isOpen && <Text ml={2}>Cart</Text>}
              </Flex>
            </Link>
            <Link to="/settings">
              <Flex align="center">
                <Icon as={FiSettings} />
                {isOpen && <Text ml={2}>Settings</Text>}
              </Flex>
            </Link>
          </VStack>
        </VStack>
      </Box>

    </Flex>
  );
};

export default Sidebar;
