import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { checkLogin } from '../controller/LoginController';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const {state,dispatch}=useContext(AuthContext);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAttempted, setLoginAttempted] = useState<boolean>(false);

  const navigate=useNavigate();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!username || !password) return;

const user = {
      username: username,
      password: password,
}

const res = await checkLogin(user);
if(res){
  console.log("Login successful");
  if(username==="snyder")dispatch({type:"LOGIN",payload:{username:username,isAdmin:true}});     //SNYDER is ADMIN, password for snyder is: f238&@*$  `
  else{
    dispatch({type:"LOGIN",payload:{username:username,isAdmin:false}});
  }
navigate("/");
}
else{
  setLoginAttempted(true);
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
      {loginAttempted && ( !state.isAuthenticated ? (<Typography variant="h6" sx={{ mt: 2 }}>Login Failed</Typography>):(<Typography variant="h6" sx={{ mt: 2 }}>Login Successfull</Typography>))}
    </Box>
  );
};

export default Login;
