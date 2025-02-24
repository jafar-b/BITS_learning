import { useContext } from "react";
import Navbar from "../components/Navbar";
import DisplayProducts from "../components/DisplayProducts";
import SelectCategory from "../components/SelectCategory";
import { CategoryContext } from "../context/CategoryContext";
import { Product } from "../models/Product";
import { fetchProducts } from "../api/Api";
import {useQuery} from '@tanstack/react-query';
import { CircularProgress, Alert } from "@mui/material";

const CategoriesPage = () => {
const {state}=useContext(CategoryContext);

const {data,error,isLoading}=useQuery({queryKey:['products'],queryFn:fetchProducts});
console.log(data);

const products:Product[]=data || [];

if(isLoading){
  return(<>
  <Navbar/>
  <CircularProgress/>
  </>)
}
if(error){
  return(<>
    <Navbar/>
    <Alert severity="error">Error loading products</Alert>;

    </>)
}
  return (
    <>

      <Navbar />
    <SelectCategory/>
<DisplayProducts products={products} category={state.selectedCategory}/>

    </>
  );
};

export default CategoriesPage;
