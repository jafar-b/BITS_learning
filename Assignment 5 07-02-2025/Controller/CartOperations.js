import axiosInstance from "../BaseUrl.js";
const fetchCartform = document.getElementById("fetch-cart-form");
const deleteForm = document.getElementById("delete-form");
const cartDetails = document.createElement("div");
const addOrUpdateCartForm = document.getElementById("add-update-form");
const userInfo = document.getElementById("user-info");

deleteForm.addEventListener("submit", deleteCart);
fetchCartform.addEventListener("submit", displayCartDetails);
addOrUpdateCartForm.addEventListener("submit", addOrUpdateCart);

document.addEventListener("DOMContentLoaded", () => {
  userInfo.innerText = `Add or Update for user: ${localStorage.getItem(
    "username"
  )}, userId: ${localStorage.getItem("userId")} CartId: ${localStorage.getItem(
    "cartId"
  )}`;
});
async function fetchCart() {
  const userId = document.getElementById("userId").value;
  try {
    const res = await axiosInstance.get(`/carts/${userId}`);
    console.log("Here is the data: ", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function displayCartDetails(e) {
  e.preventDefault();
  cartDetails.id = "cart-details";
  const data = await fetchCart();
  cartDetails.innerHTML = "";

  data.products.forEach((element) => {
    const product = document.createElement("div");
    product.innerHTML = `<p><b>Product ID:</b> ${element.productId}</p>
        <p><b>Quantity:</b> ${element.quantity}</p> `;
    cartDetails.appendChild(product);
  });
  fetchCartform.appendChild(cartDetails);
}

async function deleteCart(e) {
  e.preventDefault();
  const cartId = document.getElementById("deleteCartId").value;
  try {
    const res = await axiosInstance.delete(`/carts/${cartId}`);

    const DeletedMessge = document.createElement("div");
    if (res) {
      DeletedMessge.innerHTML = `<h3>Deleted Cart with Cart-Id ${cartId}, The owner of the cart had userId: ${res.data.userId}</h3>`;
      console.log(res.data);
    } else {
      DeletedMessge.innerHTML = `<h3>Cannot Find cart with cartId ${cartId}</h3>`;
    }
    deleteForm.appendChild(DeletedMessge);
  } catch (Err) {
    console.log(Err);
  }
}

async function addOrUpdateCart(e) {
  e.preventDefault();
  const productId = document.getElementById("productId").value;
  const quantity = document.getElementById("quantity").value;
  const responseMessage = document.getElementById("response-message");

  try {
    const userId = localStorage.getItem("userId");
    const cartId = localStorage.getItem("cartId");
    const res = await axiosInstance.put(`/carts/${cartId}`, {
      userId: userId,
      date: 2019 - 12 - 10,
      products: [{ productId: productId, quantity: quantity }],
    });
    if (res) {
      responseMessage.innerText = `Cart Updated SuccessFully, productId=${productId} has Quantity= ${quantity}`;
    }
  } catch (err) {
    console.log(err);
  }
}
