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

export const addFavourite = (newFave) => {
  let favourites = getFavourites();
  favourites.push(newFave);
  localStorage.setItem("myLocationFavourites", JSON.stringify(favourites));
  console.log("Added to favourites!");
};

export const updateFavourites = (updatedArr) => {
  localStorage.setItem("myLocationFavourites", JSON.stringify(updatedArr));
};

export const checkFavouriteExists = (fave) => {
  const currentFaves = JSON.parse(localStorage.getItem("user")).favourites;
  if (!currentFaves) return false;
  return currentFaves.filter((el) => el === fave).length > 0;
};



export const removeFavourite = (favourite) => {
  const newFavourites = getFavourites().filter((fave) => fave !== favourite);
  updateFavourites(newFavourites);
  console.log("Favourite removed!");
};
