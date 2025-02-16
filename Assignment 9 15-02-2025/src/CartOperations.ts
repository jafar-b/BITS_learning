import axiosInstance from "./BaseUrl";
import { Cart, CartProduct } from "./Interfaces";
const fetchCartform = document.getElementById("fetch-cart-form") as HTMLFormElement;
const deleteForm = document.getElementById("delete-form") as HTMLFormElement;
const cartDetails = document.createElement("div") as HTMLDivElement;
const addOrUpdateCartForm = document.getElementById("add-update-form") as HTMLFormElement;
const userInfo = document.getElementById("user-info") as HTMLDivElement;

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
  const userId = (document.getElementById("userId") as HTMLInputElement).value;
  try {
    const res = await axiosInstance.get(`/carts/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function displayCartDetails(e:Event) {
  e.preventDefault();
  cartDetails.id = "cart-details";
  const data:Cart = await fetchCart();

  cartDetails.innerHTML = "";

  data.products.forEach((element:CartProduct) => {
    const product = document.createElement("div");
    product.innerHTML = `<p><b>Product ID:</b> ${element.productId}</p>
        <p><b>Quantity:</b> ${element.quantity}</p> `;
    cartDetails.appendChild(product);
  });
  fetchCartform.appendChild(cartDetails);
}

async function deleteCart(e:Event) {
  e.preventDefault();
  const cartId = (document.getElementById("deleteCartId") as HTMLInputElement).value;
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

async function addOrUpdateCart(e:Event) {
  e.preventDefault();
  const productId = (document.getElementById("productId") as HTMLInputElement).value;
  const quantity = (document.getElementById("quantity") as HTMLInputElement).value;
  const responseMessage = document.getElementById("response-message") as HTMLDivElement;

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
