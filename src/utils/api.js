import axios from "axios";

const API = axios.create({
  baseURL: "https://studysync-backend-hc26.onrender.com/api",
  
});

export default API;