import { Flex, Box, Button, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";

const Navbar = () => {
const logout=useAuthStore((state:any)=>state.logout)
const isAuthenticated=useAuthStore((state: any) => state.isAuthenticated)


const isAdmin=useAuthStore((state:any)=>state.isAdmin)

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
     {isAdmin &&
      <Link to={"/cartoperations"}>
      <Button colorScheme="blackAlpha" variant="solid" mr={2} >
       Cart Operations
     </Button>
     </Link>
}
     {
      isAuthenticated ? 
      <Link to={"/cart"}>
      <Button colorScheme="blackAlpha" variant="solid" mr={2}>
        Cart
      </Button>
      </Link>
      :<></>
     }
      {isAdmin &&
     <Link to={"/productscrud"}>
      <Button colorScheme="blackAlpha" variant="solid" mx={2}>
        Manage Products
      </Button>
      </Link>
}
      {isAuthenticated?
      <Link to={"/login"}>
      <Button colorScheme="blackAlpha" variant="solid"  onClick={()=>{logout();}}>
        Logout
      </Button>
      </Link>
      :
      <Link to={"/login"}>
      <Button colorScheme="blackAlpha" variant="solid">
        Login
      </Button>
      </Link>
      }
    </Flex>
  );
};

export default Navbar;
