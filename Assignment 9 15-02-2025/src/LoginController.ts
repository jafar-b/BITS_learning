
import { AxiosError } from "axios";
import axiosInstance from "./BaseUrl";
import { LoginResponse } from "./Interfaces";


const form = document.getElementById("form") as HTMLFormElement;
form?.addEventListener("submit", login);


function login(e: Event) {
  const username = (document.getElementById("username") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  const login_message = document.getElementById("message");
  e.preventDefault();
  axiosInstance
  .post("/auth/login", { username, password })
  .then((res) => res.data) 
  .then((data: LoginResponse) => {                                         //USING THE INTERFACE TO GET THE DATA
    //can store in the cookie but i am using localstorage 
    localStorage.setItem("username",username);
      
      if (data.token) {
        login_message!.innerText = "Login Successfull";
        window.top!.location="Dashboard.html"
      }
    })
    .catch((err:AxiosError) => {
      console.log("Error in fetching: ", err.message);
      login_message!.innerText = "Login Failed,Please try again!";
    });
}
