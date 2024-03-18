import React from "react";
import FavouriteItem from "./FavouriteItem";

const Favourites = ({ currentFavourites, setWeatherData }) => {
  const favouritesList = currentFavourites
    ? currentFavourites.map((name, index) => {
        return <FavouriteItem key={index} name={name} setWeatherData={setWeatherData} />;
      })
    : [];

  return (
    <div className="container">
      <h1 className="text-center mt-5">
        Telling You About... <br />
        Favourite Locations
      </h1>
      <div className="row">
        {favouritesList.length > 0 ? (
          favouritesList
        ) : (
          <h2 className="mt-5 text-center">You Have No Favourites Yet!</h2>
        )}
      </div>
    </div>
  );
};

export default Favourites;
