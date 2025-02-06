/*
Task: Write a function fetchData that simulates fetching data from a server using a callback function.
The function should take a callback that processes the data after a delay of 2 seconds.
Use setTimeout to simulate the server delay.
The data should be an array of user names. Bonus Task: Implement error handling in the callback function to simulate a case where the server might fail.
*/

const callback=(data)=>{
try{
    setTimeout(()=>{
        //A case where server might fail
        if(!data){throw new Error("No data from server")}else{
        data.map((user)=>console.log(user.username))
        }

    }
,2000);
}catch(err){console.log("Error in callback: "+err);
}
}

const fetchData=(callback)=>{
const url=`https://jsonplaceholder.typicode.com/users`
fetch(url).then(res=>res.json()).then((data)=>callback(data)).catch((err)=>console.log("Error in fetching: "+ err)
)

}
fetchData(callback);

// output:
// Bret
// Antonette
// Samantha
// Karianne
// Kamren
// Leopoldo_Corkery
// Elwyn.Skiles
// Maxime_Nienow
// Delphine
// Moriah.Stanton