import axios from "axios";

const appAPI = axios.create({
  baseURL: `http://localhost:4000/auth`,
});

export const loginUser = async (username, password) => {
  try {
    const response = await appAPI.post("/login", {
      username,
      password,
    });
    axios.defaults.headers.common["access-token"] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error("Error logging in", error.response.data);
    return error.response.data;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await appAPI.post("/signup", { username, password });
    axios.defaults.headers.common["access-token"] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error("Error registering", error.response.data);
    return error.response.data;
  }
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
