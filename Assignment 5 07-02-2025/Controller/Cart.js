import axiosInstance from "../BaseUrl.js";
document.addEventListener("DOMContentLoaded", showProducts);

async function showProducts() {
  const products = await fetchProducts();

  const cart_container = document.getElementById("cart-container");
  const loadingelement = document.getElementById("loading-element");

  products.forEach((element) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
    <h3>ProductName: ${element.productId}</h3>
     <h4>Quantity: ${element.quantity}</h4>
     `;
    loadingelement.remove();
    cart_container.appendChild(productCard);
  });
}

async function fetchProducts() {
  const res = await axiosInstance.get("/users");
  const users = await res.data;

  const username = localStorage.getItem("username");
  const userId = users.filter((user) => {
    return user.username === username;
  })[0].id;

  const userCart = await axiosInstance.get(`/carts/${userId}`);
  console.log(await userCart.data);
  localStorage.setItem("userId", userCart.data.userId);
  localStorage.setItem("cartId", userCart.data.id);
  return userCart.data.products;
}
