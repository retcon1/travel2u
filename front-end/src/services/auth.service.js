import axios from "axios";

const appAPI = axios.create({
  baseURL: `http://localhost:4000`,
});

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", {
      username,
      password,
    });
    axios.defaults.headers.common['access-token'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error("Error logging in", error.response.data);
    return error.response.data;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await appAPI.post("/auth/signup", { username, password });
    axios.defaults.headers.common['access-token'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error("Error registering", error.response.data);
    return error.response.data;
  }
};
