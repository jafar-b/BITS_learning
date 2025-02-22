import { useEffect, useState } from "react";
import "./App.css";

import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const [text, setText] = useState<string>("");
  const search = useLocation().search; //gives the query parameters as string to search variable
  const navigate = useNavigate();

  useEffect(() => {
    //to work with this string in "search" variable we use URLSearchParams which converts the contents of string to an  object of which properties can be accessed.
    const params = new URLSearchParams(search); 
    params.set("params", text);
    if (text === "") {
      console.log("No parameters");           
      params.delete("params");
    }
    navigate(`?${params.toString()}`);
  }, [text]);

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Parameters"
        style={{ marginRight: "20px" }}
      />
      <button onClick={() => setText("")}>Clear query parameters</button>
    </>
  );
}

export default App;
