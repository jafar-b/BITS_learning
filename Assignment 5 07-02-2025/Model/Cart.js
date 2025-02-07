//#########implemented single responsibility between these functions###############

import axiosInstance from "../BaseUrl.js";
document.addEventListener("DOMContentLoaded", showProducts);
async function fetchProducts() {
  const res = await axiosInstance.get("/users");
  const users = await res.data;

  const username = localStorage.getItem("username");
  const userId = users.filter((user) => {
    return user.username === username;
  })[0].id;

  const userCart = await axiosInstance.get(`/carts/${userId}`);
//   console.log(await cartProducts.data.products);
return userCart.data.products;
}



async function showProducts(){
const products=await fetchProducts();


// console.log("These are the actual products: ",products);
const cart_container=document.getElementById("cart-container");
const loadingelement=document.getElementById("loading-element");
console.log(products);
products.forEach(element => {
    const productCard=document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML=`
    <h3>ProductName: ${element.productId}</h3>
     <h4>Quantity: ${element.quantity}</h4>
     `
     loadingelement.remove();
  cart_container.appendChild(productCard)     

});

} 

[
  {
    productId: 1,
    quantity: 4,
  },
  {
    productId: 2,
    quantity: 1,
  },
  {
    productId: 3,
    quantity: 6,
  },
];
