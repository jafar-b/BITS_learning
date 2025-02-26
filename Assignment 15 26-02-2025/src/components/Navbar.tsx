import { Flex, Box, Button, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex as="nav" p={4} bg="blue.500" color="white" align="center">
      <Box fontSize="xl" fontWeight="bold">
        MyStore
      </Box>
      <Spacer />
      <Link to={"/"}>
      <Button colorScheme="blackAlpha" variant="solid" mr={2}>
        Home
     </Button>
     </Link>
      <Link to={"/cart"}>
      <Button colorScheme="blackAlpha" variant="solid" mr={2}>
        Cart
      </Button>
      </Link>
     <Link to={"/productscrud"}>
      <Button colorScheme="blackAlpha" variant="solid" mx={2}>
        Manage Products
      </Button>
      </Link>
      <Link to={"/login"}>
      <Button colorScheme="blackAlpha" variant="solid">
        Login
      </Button>
      </Link>
    </Flex>
  );
};

export default Navbar;
