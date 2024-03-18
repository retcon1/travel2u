export const getFavourites = () => {
  if (!JSON.parse(localStorage.getItem("myLocationFavourites"))) return [];
  return JSON.parse(localStorage.getItem("myLocationFavourites"));
};

export const updateFavourites = (updatedArr) => {
  localStorage.setItem("myLocationFavourites", JSON.stringify(updatedArr));
};

export const checkFavouriteExists = (fave) => {
  const currentFaves = getFavourites();
  if (!currentFaves) return false;
  return currentFaves.filter((el) => el === fave).length > 0;
};

export const addFavourite = (newFave) => {
  let favourites = getFavourites();
  favourites.push(newFave);
  localStorage.setItem("myLocationFavourites", JSON.stringify(favourites));
  console.log("Added to favourites!");
};

export const removeFavourite = (favourite) => {
  const newFavourites = getFavourites().filter((fave) => fave !== favourite);
  updateFavourites(newFavourites);
  console.log("Favourite removed!");
};
