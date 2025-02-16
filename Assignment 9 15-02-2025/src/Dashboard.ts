import axiosInstance from "./BaseUrl";
import { Product } from "./Interfaces";
const cartContainer = document.getElementById("cart-container") as HTMLDivElement;
const previousPageBtn = document.getElementById("previous-page-btn") as HTMLButtonElement;
const nextPageBtn = document.getElementById("next-page-btn") as HTMLButtonElement;
let currentPage = 1;
document.addEventListener("DOMContentLoaded", displayProductsList);
async function fetchProductsList() {
  try {
    const products = await axiosInstance.get("/products");
    return await products.data;
  } catch (err) {
    console.log(err);
  }
}
  
//Cannot apply pagination because theres no query parameter as ?page=
//So Fetching all the data at once and slicing half(10 out of 20) and displaying them
async function displayProductsList() {
  const initialProductsArray:Product[] = await fetchProductsList();
  const mid = Math.floor(initialProductsArray.length / 2);
  const slicedArray1:Product[] = initialProductsArray.slice(0, mid);
  const slicedArray2:Product[] = initialProductsArray.slice(mid);
  setAllElements(slicedArray1);
  previousPageBtn?.addEventListener("click", () => {
    if (currentPage !== 1) {
      currentPage = 1;
      setAllElements(slicedArray1);
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage !== 2) {
      currentPage = 2;
      setAllElements(slicedArray2);
    }
  });
}

async function setAllElements(productsArray:Product[]) {
  cartContainer.innerHTML = "";
  productsArray.forEach((element:Product) => {
    const productCard = document.createElement("div");
    productCard.id = "product-card";
    productCard.innerHTML = `
    <img src="${element.image}" width="150px" height="150px">
    <h3>${element.title}</h3>
     <div>
  <b>Rating:</b> <span>3.9</span>
  <br>
  <b>Count:</b> <span>120</span>
</div>
     <h4>Price: ${element.price}</h4>
     `;
    cartContainer.appendChild(productCard);
  });
}
