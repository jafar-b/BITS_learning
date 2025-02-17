import { useLocation } from "react-router-dom";
const DisplayData = () => {
  const location = useLocation();   
  let { userDetails } = location.state || {}; //used object destructuring. to access userDetails from location state
  return (
    <>
      {userDetails ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
          }}
        >
          <h1>Hello {userDetails.firstname} your details are:</h1>
          <div>
            <p>First Name: {userDetails.firstname}</p>
            <p>Last Name: {userDetails.lastname}</p>
            <p>Age: {userDetails.age}</p>
            <p>Gender: {userDetails.gender}</p>
            <p>Email: {userDetails.email}</p>
            <p>Phone: {userDetails.phone}</p>
            <p>Address: {userDetails.address}</p>
            <p>Skills: {userDetails.skills}</p>
          </div>
        </div>
      ) : (
        <p>No data in location.state</p>
      )}
    </>
  );
};

export default DisplayData;
