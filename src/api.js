import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "a4a714d580e5bb9966728ad443bcb645",
    language: "en-US",
  },
});

export default api;
