import axios from "axios";
import { getUser } from "./auth.service";

const appAPI = axios.create({
  baseURL: `https://travel2u-api.onrender.com/favourites`,
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
  const user = getUser();
  if (!user) return [];
  return user.favourites ? user.favourites : [];
};

export const addFavourite = async (newFave) => {
  const user = getUser();
  const token = user.token;
  if (!token) alert("No token found, please logout and login again");

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
  const favourites = getUser().favourites;
  if (!favourites) return false;
  return favourites.includes(fave);
};

export const removeFavourite = async (faveToRemove) => {
  const user = getUser();
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
