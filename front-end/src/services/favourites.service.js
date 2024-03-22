import axios from "axios";

const appAPI = axios.create({
  baseURL: `http://localhost:4000/favourites`,
});

export const getFavourites = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  if (!token) return;
  try {
    const response = await appAPI.get(`/`, {
      headers: { "access-token": token },
    });
    return response.data.favourites;
  } catch (error) {
    console.error("Error getting favourites", error.response.data);
  }
};

export const addFavourite = async (newFave) => {
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding favourite", error.response.data);
  }
};

export const updateFavourites = (updatedArr) => {
  localStorage.setItem("myLocationFavourites", JSON.stringify(updatedArr));
};

export const checkFavouriteExists = (fave) => {
  const currentFaves = JSON.parse(localStorage.getItem("user")).favourites;
  if (!currentFaves) return false;
  return currentFaves.filter((el) => el === fave).length > 0;
};

export const removeFavourite = async (faveToRemove) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  if (!token) return;
  try {
    const response = await appAPI.delete(
      `/`,
      {
        data: { faveToRemove },
        headers: { "access-token": token },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding favourite", error.response.data);
  }
};