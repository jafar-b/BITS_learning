import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getAllCategories } from "../api/Api";
import { CategoryContext } from "../context/CategoryContext";
const SelectCategory = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [inputCategory, setInputCategory] = useState<string>("");
const {dispatch}=useContext(CategoryContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories();
      if (data) {
      setCategories(data);
      }
    };
    fetchData();
  }, []);


  useEffect(()=>{
dispatch({type:"SET_CATEGORY",payload:inputCategory})
},[inputCategory])


  return (

<>
    <FormControl fullWidth sx={{ my: 2, mx:1,width: "90vw" }}>
      <InputLabel id="select-category-label">Category</InputLabel>
      <Select
        labelId="select-category-label"
        id="select-category"
        value={inputCategory}
        label="Category"
        onChange={(e) => setInputCategory(e.target.value)}
        >
        <MenuItem value="All">
          <em>All</em>
        </MenuItem>
        {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
        </>
  );
};

export default SelectCategory;
