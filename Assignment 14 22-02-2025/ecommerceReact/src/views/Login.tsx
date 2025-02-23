import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { checkLogin } from '../controller/LoginController';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login,setLogin]=useState<boolean>();
  const navigate=useNavigate();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

const user = {
      username: username,
      password: password,
}

const res = await checkLogin(user);
if(res){
  console.log("Login successful");
setLogin(true);
navigate("/");
}
else{
  setLogin(false);
  console.log("Login failed");
}

}



  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="80vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} width="300px">
        <TextField
          label="Username"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
      {login===false && (<Typography variant="h6" sx={{ mt: 2 }}>Login Failed</Typography>)}
    </Box>
  );
};

export default Login;
