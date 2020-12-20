import axios from "axios";

const instance = axios.create({
  baseURL: "https://pai-tic-tac-toe.herokuapp.com/",
});

export default instance;
