import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCategories } from "../api/Api";
const SelectCategory = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [inputCategory, setInputCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories();
      if (data) {
      setCategories(data);
      }
    };
    fetchData();
  }, []);



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
        <MenuItem value="">
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
