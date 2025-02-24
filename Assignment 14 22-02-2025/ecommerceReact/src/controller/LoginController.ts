import { User } from "../models/User";
import { getAllUsers } from "../api/Api";
export async function checkLogin(user: User) {
  const res = await getAllUsers();
  if (res) {
const found=res.find((u:User)=>u.username===user.username && u.password===user.password)
if(found){ 
  console.log("Login user is: ",found);
    return true;
  } else {
    return false;
  }
  }
  else{
    console.log("Problem in login" );
    
    return false;}
}