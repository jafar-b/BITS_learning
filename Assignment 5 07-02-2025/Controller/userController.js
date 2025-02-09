import axiosInstance from "../BaseUrl.js";
const deleteUserForm = document.getElementById("delete-user-form");
const fetchAllUsersBtn = document.getElementById("get-all-users");
const usersDropdown = document.getElementById("users-dropdown");
const getUserForm = document.getElementById("get-user-form");
const addOrUpdateForm = document.getElementById("add-update-form");
const userDetails = document.getElementById("user-details");
addOrUpdateForm.addEventListener("submit", addOrUpdateUser);
getUserForm.addEventListener("submit", getUser);
fetchAllUsersBtn.addEventListener("click", fetchAllUsers);
deleteUserForm.addEventListener("submit", deleteUser);

async function deleteUser(e) {
  e.preventDefault();
  const userId = document.getElementById("deleteUserId").value;
  const responseMsg = document.getElementById("response-msg");
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

function populateDropdown(users) {
  usersDropdown.innerHTML = `<option value="">Select a user</option>`; // to Reset dropdown
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${user.name.firstname} ${user.name.lastname} (${user.email})`;
    usersDropdown.appendChild(option);
  });
}

async function getUser(e) {
  e.preventDefault();
  userDetails.innerHTML = "";
  const userId = document.getElementById("userId").value;
  const userInfo = document.createElement("div");
  userInfo.id = "user-info";
  try {
    const res = await axiosInstance.get(`/users/${userId}`);
    console.log(await res.data);
    const data = res.data;
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

async function addOrUpdateUser(e) {
  e.preventDefault();
  const userId = document.getElementById("userId-update").value;
  const userName = document.getElementById("userName").value;
  const userPassword = document.getElementById("userPassword").value;
  const responseMsg = document.getElementById("update-response-msg");
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

async function userExistsCheck(name) {
  const res = await axiosInstance.get("/users");
  const data = await res.data;
  return data.some((element) => element.username === name);
}
