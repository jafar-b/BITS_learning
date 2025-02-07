const axiosInstance = axios.create({
    baseURL: `https://fakestoreapi.com`,
    Headers: { "Content-Type": "application/json" },
  });

  export default axiosInstance;