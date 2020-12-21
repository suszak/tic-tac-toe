import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8002",
  // baseURL: "https://pai-tic-tac-toe.herokuapp.com/",
});

export default instance;
