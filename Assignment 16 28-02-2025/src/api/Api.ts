

import { ICart } from "@/models/ICart";
import axios from "axios";



const BASE_URL = "https://fakestoreapi.com";

    export interface Product {
        productId: number | null;
        quantity: number | null;
        id: number | null;
        title: string | null;
        price: number | null;
        description: string | null;
        category: string | null;
        image: string | null;
        rating:{
            rate:number |null;
            count:number|null;
        } |null
      }

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

export async  function updateCart(id:number,productId:number,quantity:number){
  try {
    const res = await axiosInstance.patch(`/carts/${id}`,{
      productId,
      quantity
    });
    return res.data;
  } catch (e) {
    console.log("problem in Api: ",e);
    return null;
  }
}


export async function getInCategory(category:string){
  try {
    const res = await axiosInstance.get(`/products/category/${category}`);
    return res.data;
  } catch (e) {
    console.log("problem in Api: ",e);
    return null;
  }
}



export async function addProduct(product:Product){
try{
  const res = await axiosInstance.post("/products",product);
  return res.data;
}  catch (e) {  
  console.log("problem in Api: ",e);
  return null;
}
}

export async function editProduct(product:Product){
  try{
    const res = await axiosInstance.patch(`/products/${product.id}`,product);
    return res.data;
  }  catch (e) {  
    console.log("problem in Api: ",e);
    return e;
  }
  }

  export async function deleteProduct(id:number){
    try{
      const res = await axiosInstance.delete(`/products/${id}`);   
      return res.data;
    }  catch (e) {  
      console.log("problem in Api: ",e);
      return null;
    }
    }

    export async function fetchProduct(id:number){
      try{
        const res = await axiosInstance.get(`/products/${id}`);   
        return res.data;
      }catch(e){console.log("Problem in Api",e);
        return e;
      }
    }

    
    export async function fetchAllCarts(){
      try{
        const res = await axiosInstance.get(`/carts`);   
        return res.data;
      }catch(e){console.log("Problem in Api",e);
        return e;
      }
    }


    export async function addCart(cart:ICart){
      try {
        const res=await axiosInstance.post("/carts",cart);
        return res.data;
      } catch (error) {

        console.log("Problem in Api",error);
        
      }
    }

export async function deleteCart(id:number){
try {
  
const res=await axiosInstance.delete(`/carts/${id}`)
return res.data;
} catch (error) {
  console.log("Problem in API,",error);
  return error
}


    }


    

export async function fetchCartById(id:number){
try {
const res=await axiosInstance.get(`/carts/${id}`)
return res.data;
} catch (error) {
  console.log("Problem in API,",error);
  return error
}

    }


