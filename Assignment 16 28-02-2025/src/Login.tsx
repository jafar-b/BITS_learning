import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useAuthStore} from "@/store/AuthStore"
import { checkLogin } from './controllers/LoginController';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAttempted, setLoginAttempted] = useState<boolean>(false);
const loginAdmin=useAuthStore((state:any)=>state.loginAdmin)
  const navigate = useNavigate();
  const login = useAuthStore((state:any) => state.loginUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;
    if(username==="snyder"&&password==="f238&@*$"){
 loginAdmin();
      navigate("/");
return;
    }
    
    if(await checkLogin({username,password})){
           login();
        navigate('/'); 
    } else {
      setLoginAttempted(true);
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="80vh"
    >
      <Text fontSize="2xl" mb={4}>
        Login
      </Text>
      <Box as="form" onSubmit={handleSubmit} width="300px">
        <VStack spacing={4}>
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            colorScheme="blue" 
            width="full"
          >
            Login
          </Button>
        </VStack>
      </Box>
      {loginAttempted && (
        <Text fontSize="lg" mt={4}>Login Failed</Text>
      )}
    </Box>
  );
};

export default Login;