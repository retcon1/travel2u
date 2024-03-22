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
    axios.defaults.headers.common["access-token"] = `${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error("Error logging in", error.response.data);
    return error.response.data;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await appAPI.post("/signup", { username, password });
    axios.defaults.headers.common["access-token"] = `${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error("Error registering", error.response.data);
    return error.response.data;
  }
};

export const changePassword = async (password, newPassword) => {
  const user = getUser();
  const token = user.token;
  try {
    const response = await appAPI.patch("/change-pass", {
      username: user.username,
      password,
      newPassword,
    }, {
      headers: { "access-token": token },
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password", error.response.data);
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
