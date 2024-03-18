import React, { useEffect, useState } from "react";
import WeatherContainer from "./WeatherContainer";
import {
  addFavourite,
  checkFavouriteExists,
  removeFavourite,
} from "../services/favourites.service";
import Map from "./Map";

const SearchResult = ({ weatherData }) => {
  const [currentFave, setCurrentFave] = useState(false);

  useEffect(() => {
    setCurrentFave(checkFavouriteExists(weatherData.name));
  }, [weatherData]);

  return (
    <div className="d-flex row justify-content-center align-items-center text-center mt-5">
      <h1 className="mb-4">Telling You About...</h1>
      <h2>
        <strong>{weatherData.name}</strong>
      </h2>
      {currentFave ? (
        <h4 className="mb-3 d-flex align-items-center justify-content-center">
          <div className="fave-filled">
            <i
              data-testid="fave-filled"
              className="bi bi-bookmark-check-fill mx-2 check"
              onClick={() => {
                removeFavourite(weatherData.name);
                setCurrentFave(false);
              }}
            />
          </div>
          Remove from favourites
        </h4>
      ) : (
        <h4 className="mb-3 d-flex align-items-center justify-content-center">
          <div className="fave-no-fill">
            <i
              data-testid="fave-no-fill"
              className="bi bi-bookmark-check mx-2 check"
              onClick={() => {
                addFavourite(weatherData.name);
                setCurrentFave(true);
              }}
            />
          </div>
          Add to favourites
        </h4>
      )}
      <div className="results">
        <WeatherContainer weatherData={weatherData} />
        <Map weatherData={weatherData} />
      </div>
    </div>
  );
};

export default SearchResult;
