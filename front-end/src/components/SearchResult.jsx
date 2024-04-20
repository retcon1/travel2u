import React from "react";
import WeatherContainer from "./WeatherContainer";

import Map from "./Map";
import FavouriteButton from "./FavouriteButton";

const SearchResult = ({ weatherData, setCurrentFavourites, user }) => {

  return (
    <div className="d-flex row justify-content-center align-items-center text-center mt-5">
      <h1 className="mb-4">Telling You About...</h1>
      <h2>
        <strong>{weatherData.name}</strong>
      </h2>
      <FavouriteButton
        weatherData={weatherData}
        setCurrentFavourites={setCurrentFavourites}
        user={user}
      />
      <div className="results">
        <WeatherContainer weatherData={weatherData} />
        <Map weatherData={weatherData} />
      </div>
    </div>
  );
};

export default SearchResult;
