
import { User } from "../models/User";
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllUsers() {

  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (e) {
    console.log("problem in Api: ",e);
    return null;
  }
}



export async function fetchProducts(){
  try {
    const res = await axiosInstance.get("/products");
    return res.data;
  } catch (e) {
    console.log("problem in Api: ",e);
    return null;
  }
}


export async function fetchProductByCategory(category:string){
  try {
    const res = await axiosInstance.get(`/products/category/${category}`);
    return res.data;
  } catch (e) {
    console.log("problem in Api,in fetching category: ",e);
    return null;
  }
}


export async function getAllCategories(){
  try {
    const res = await axiosInstance.get("/products/categories");
    return res.data;
  } catch (e) {
    console.log("problem in Api: ",e);
    return null;
  }
}

export async function fetchCart(id:number){
  try {
    const res = await axiosInstance.get(`/carts/user/${id}`);
    return res.data;
  } catch (e) {
    console.log("problem in Api: ",e);
    return null;
  }
}




