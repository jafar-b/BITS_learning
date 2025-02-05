// GET REQUEST
// function getTodos() {
//   axios({
//     method:'get',
//     url:`https://jsonplaceholder.typicode.com/todos`,
//     params:{
//       _limit:5
//     }
//   }).then((res)=>showOutput (res)
//   ).catch((err)=>console.log(err));

// }


function getTodos() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((Err) => console.log(Err));
}

// PUT/PATCH REQUEST
//Using axios.put
// function updateTodo() {
//   axios
//     .put("https://jsonplaceholder.typicode.com/todos/1", {
//       title: "Updated Todo",
//       completed: true,
//     })
//     .then((res) => showOutput(res))
//     .catch((err) => console.log(err));
// }
//Update using axios.patch
function updateTodo() {
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated using patch",
      completed: true,
    })
    .then((res) => showOutput(res));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
// function getData() {
//   axios
//     .all([
//       axios.get("https://jsonplaceholder.typicode.com/todos"),
//       axios.get("https://jsonplaceholder.typicode.com/posts"),
//     ])
//     .then((res) => {console.log(res[0]);console.log(res[1]);
//     })
//     .catch((err) => console.log(err));
// }

function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(axios.spread((posts, todos) => showOutput(todos)))
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    "Content-Type": "application/json",
    Authorization: "SomeToken",
  };
  axios
    .post("https://jsonplaceholder.typicode.com/todos", config)
    .then((res) => showOutput(res));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "post",
    data: { title: "New Title", completed: false },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

axios.interceptors.request.use(
  config=>{
    // console.log(`request of type "${config.method}" and url: ${config.url} sent at time: ${new Date().getTime()}`)
    console.log(config);

    return config;
  },error=>Promise.reject(error)

)



// ERROR HANDLING
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todossss', {
    validateStatus: function(status) {
      return status < 500; 
    }
  })
  .then(res => showOutput(res))
  .catch(err => {
    if (err.response) {
      
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      
      if (err.response.status === 404) {
        alert('Error: Page Not Found');
      }
    } else if (err.request) {
      
      console.error(err.request);
    } else {
      console.error(err.message);
    }
  });
}

axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/posts', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(err => {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      }
    });

  if (true) {
    source.cancel('Request is canceled');
  }
}
// AXIOS INSTANCES

const axiosInstance=axios.create({
  baseURL:`https://jsonplaceholder.typicode.com`
})
axiosInstance.get("/comments").then((res)=>showOutput(res))


function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
