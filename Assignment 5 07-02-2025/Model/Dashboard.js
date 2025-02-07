import axiosInstance from "../BaseUrl.js";
async function displayProductsList() {
  const products = await axiosInstance.get("/products");
  console.log(await products.data);
}

displayProductsList();
