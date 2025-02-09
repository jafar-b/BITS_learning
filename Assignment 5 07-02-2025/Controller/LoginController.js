import axiosInstance from "../BaseUrl.js";
const form = document.getElementById("form");
form.addEventListener("submit", login);

function login(e) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const login_message = document.getElementById("message");
  e.preventDefault();
  axiosInstance
  .post("/auth/login", { username, password })
  .then((res) => res.data)
  .then((data) => {
    //can store in the cookie but i am using localstorage 
    localStorage.setItem("username",username);
    
      if (data.token) {
        login_message.innerText = "Login Successfull";
        window.top.location="Dashboard.html"
      }
    })
    .catch((err) => {
      console.log("Error in fetching: ", err);
      login_message.innerText = "Login Failed,Please try again!";
    });
}
