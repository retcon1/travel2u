import axios from "axios";

const appAPI = axios.create({
  baseURL: `http://localhost:4000/favourites`,
});

export const getFavourites = () => {
  // Unnecessary to make a request to the server for this data
  // const token = JSON.parse(localStorage.getItem("user")).token;
  // if (!token) return;
  // try {
  //   const response = await appAPI.get(`/`, {
  //     headers: { "access-token": token },
  //   });
  //   return response.data.favourites;
  // } catch (error) {
  //   console.error("Error getting favourites", error.response.data);
  // }
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];
  return user.favourites ? user.favourites : [];
};

export const addFavourite = async (newFave) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("user")).token;
  if (!token) return;
  try {
    const response = await appAPI.patch(
      `/`,
      { newFave },
      {
        headers: { "access-token": token },
      }
    );
    user.favourites = response.data.user.favourites;
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  } catch (error) {
    console.error("Error adding favourite", error);
  }
};

export const checkFavouriteExists = (fave) => {
  const favourites = JSON.parse(localStorage.getItem("user")).favourites;
  return favourites.includes(fave);
};

export const removeFavourite = async (faveToRemove) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (!token) return;
  try {
    const response = await appAPI.delete(`/`, {
      data: { faveToRemove },
      headers: { "access-token": token },
    });

    user.favourites = response.data.user.favourites;
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  } catch (error) {
    console.error("Error removing favourite", error.response.data);
  }
};
