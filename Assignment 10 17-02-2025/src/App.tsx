import React, { useState } from "react";
// import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const App = () => {
  const navigate = useNavigate(); 
  //using useNavigate to pass the details as state between components (state is a property of location object which is used to pass data between components)
  type FormData = {
    firstname: string;
    lastname: string;
    age: number | "";
    gender: string;
    email: string;
    phone: number | "";
    address: string;
    skills: string;
  };

  const [data, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/DisplayData", { state: { userDetails: data } });
  };

  //suggested by Chinmay
  const handleChange = (key: string, value: string | number) => {
    setFormData((previousData) => ({ ...previousData, [key]: value }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          name="firstname"
          value={data.firstname}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          required
        />

        <TextField
          label="Last Name"
          variant="outlined"
          name="lastname"
          value={data.lastname}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          required
        />

        <TextField
          label="Age"
          type="number"
          variant="outlined"
          name="age"
          value={data.age}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          required
        />

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            name="gender"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={data.gender}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <InputLabel>Skills</InputLabel>
          <Select
            name="skills"
            value={data.skills}
            onChange={(e) =>
              handleChange(e.target.name, e.target.value as string)
            }
            required
          >
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="TypeScript">TypeScript</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Node.js">Node.js</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={data.email}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          required
        />

        <TextField
          label="Phone Number"
          type="tel"
          variant="outlined"
          name="phone"
          value={data.phone}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          required
        />

        <TextField
          label="Address"
          multiline
          rows={3}
          variant="outlined"
          name="address"
          value={data.address}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default App;
