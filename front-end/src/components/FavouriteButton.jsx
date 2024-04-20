import React, { useEffect, useState } from "react";
import {
  addFavourite,
  checkFavouriteExists,
  removeFavourite,
} from "../services/favourites.service";

const FavouriteButton = ({ weatherData, setCurrentFavourites, user }) => {
  const [currentFave, setCurrentFave] = useState(false);

  useEffect(() => {
    setCurrentFave(checkFavouriteExists(weatherData.name));
  }, [weatherData]);

  if (!user) {
    return (
      <h4 className="mb-4">
        Sign in to add to favourites...
      </h4>
    );
  }

  return (
    <div>
      {currentFave ? (
        <h4 className="mb-3 d-flex align-items-center justify-content-center">
          <div className="fave-filled">
            <i
              data-testid="fave-filled"
              className="bi bi-bookmark-check-fill mx-2 check"
              onClick={() => {
                removeFavourite(weatherData.name);
                setCurrentFavourites((prevFavourites) =>
                  prevFavourites.filter((fave) => fave !== weatherData.name)
                );
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
                setCurrentFavourites((prevFavourites) => [...prevFavourites, weatherData.name]);
                setCurrentFave(true);
              }}
            />
          </div>
          Add to favourites
        </h4>
      )}
    </div>
  );
};

export default FavouriteButton;
