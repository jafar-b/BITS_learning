import axiosInstance from "./BaseUrl";
import { Cart, CartProduct, User } from "./Interfaces";



document.addEventListener("DOMContentLoaded", showProducts);

async function showProducts() {
  const products: CartProduct[] = await fetchProducts();

  const cart_container = document.getElementById("cart-container") as HTMLDivElement;
  const loadingelement = document.getElementById("loading-element") as HTMLDivElement;

  products.forEach((element: CartProduct) => {

    const cartCard = document.createElement("div");
    cartCard.classList.add("cart-card");
    cartCard.innerHTML = `
    <h3>ProductName: ${element.productId}</h3>
     <h4>Quantity: ${element.quantity}</h4>
     `;
    loadingelement?.remove();
    cart_container?.appendChild(cartCard);
  });
}

async function fetchProducts() {
  const res = await axiosInstance.get("/users");
  const users:User[] = await res.data;

  const username = localStorage.getItem("username");
  const userId = users.filter((user:User) => {
    return user.username === username;
  })[0].id;

  const userCart = await axiosInstance.get(`/carts/${userId}`);
  const cartData: Cart = await userCart.data;
  
  localStorage.setItem("userId", cartData.userId.toString());
  localStorage.setItem("cartId", cartData.id.toString());
  return cartData.products;
}
