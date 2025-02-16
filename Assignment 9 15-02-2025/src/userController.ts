import axiosInstance from "./BaseUrl";
import { User } from "./Interfaces";
const deleteUserForm = document.getElementById("delete-user-form") as HTMLFormElement;
const fetchAllUsersBtn = document.getElementById("get-all-users") as HTMLButtonElement;
const usersDropdown = document.getElementById("users-dropdown") as HTMLSelectElement;
const getUserForm = document.getElementById("get-user-form") as HTMLFormElement;
const addOrUpdateForm = document.getElementById("add-update-form") as HTMLFormElement;
const userDetails = document.getElementById("user-details") as HTMLDivElement;
addOrUpdateForm.addEventListener("submit", addOrUpdateUser);
getUserForm.addEventListener("submit", getUser);
fetchAllUsersBtn.addEventListener("click", fetchAllUsers);
deleteUserForm.addEventListener("submit", deleteUser);

async function deleteUser(e:Event) {
  e.preventDefault();
  const userId = (document.getElementById("deleteUserId") as HTMLInputElement).value;
  const responseMsg = document.getElementById("response-msg") as HTMLDivElement;
  try {
    const res = await axiosInstance.delete(`/users/${userId}`);
    console.log(await res.data);

    responseMsg.innerText = `User: ${res.data.username} Deleted!`;
  } catch (err) {
    console.log(err);
  }
}

async function fetchAllUsers() {
  const res = await axiosInstance.get("/users");
  console.log(await res.data);
  populateDropdown(await res.data);
}

function populateDropdown(users:User[]) {
  usersDropdown.innerHTML = `<option value="">Select a user</option>`; // to Reset dropdown
  users.forEach((user:User) => {
    const option = document.createElement("option") as HTMLOptionElement;
    option.value = user.id.toString();
    option.textContent = `${user.name.firstname} ${user.name.lastname} (${user.email})`;
    usersDropdown.appendChild(option);
  });
}

async function getUser(e:Event) {
  e.preventDefault();
  userDetails.innerHTML = "";
  const userId = (document.getElementById("userId") as HTMLInputElement).value;
  const userInfo = document.createElement("div") as HTMLDivElement;
  userInfo.id = "user-info";
  try {
    const res = await axiosInstance.get(`/users/${userId}`);
    console.log(await res.data);
    const data:User = await res.data;
    userInfo.innerHTML = ` <h2>User Details</h2>
        <p><b>ID:</b> ${data.id}</p>
        <p><b>Name:</b> ${data.name.firstname + " " + data.name.lastname}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Username:</b> ${data.username}</p>
        <p><b>Phone:</b> ${data.phone}</p>`;
    userDetails.appendChild(userInfo);
  } catch (err) {
    console.log(err);
  }
}

async function addOrUpdateUser(e:Event  ) {
  e.preventDefault();
  const userId = (document.getElementById("userId-update") as HTMLInputElement).value;
  const userName = (document.getElementById("userName") as HTMLInputElement).value;
  const userPassword = (document.getElementById("userPassword") as HTMLInputElement).value;
  const responseMsg = document.getElementById("update-response-msg") as HTMLDivElement;
  responseMsg.innerHTML = "";

  if (userId) {
    try {
      const res = await axiosInstance.patch(`/users/${userId}`, {
        username: userName,
        password: userPassword,
      });
      console.log(await res.data);
      responseMsg.innerHTML = `<span> User with id ${userId} updated! </span>`;
    } catch (error) {
      console.log(error);
    }
  }
  if (!userId) {
    try {
      if (await userExistsCheck(userName)) {
        responseMsg.innerHTML = `<span> User already exists</span>`;
      } else {
        const res = await axiosInstance.post(`/users`, {
          username: userName,
          password: userPassword,
        });
        const data = await res.data;
        console.log("New User Added", data);
        responseMsg.innerHTML = `<span> User "${userName}" Added with ID: ${data.id}</span>`;
      }
    } catch (error) {
      responseMsg.innerHTML = `<span> Error in Adding user</span>`;
      console.log(error);
    }
  }
}

async function userExistsCheck(name:string) {
  const res = await axiosInstance.get("/users");
  const data = await res.data;
  return data.some((element:User) => element.username === name);
}
