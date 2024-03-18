import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavourite, removeFavourite } from "../services/favourites.service";
import { getWeatherData } from "../services/weatherData.service";

const FavouriteItem = ({ name, setWeatherData }) => {
  const [isFilled, setIsFilled] = useState(true);

  const navigate = useNavigate();

  const handleFaveClick = async (e) => {
    console.log(e.target.textContent);
    e.preventDefault();
    const data = await getWeatherData(e.target.textContent);
    setWeatherData(data);
    navigate(`/search/${e.target.textContent}`);
  };

  if (isFilled)
    return (
      <h2 className="col-md-6 col-lg-4 mb-4 d-flex align-items-center justify-content-center">
        <button
          data-testid="fave-filled"
          className="fave-filled"
          onClick={() => {
            removeFavourite(name);
            setIsFilled(false);
          }}
        >
          <i className="bi bi-bookmark-check-fill mx-2 check" />
        </button>
        <div style={{ cursor: "pointer" }} onClick={handleFaveClick}>
          {name}
        </div>
      </h2>
    );

  return (
    <h2 className="col-md-6 col-lg-4 mb-4 d-flex align-items-center justify-content-center">
      <button
        data-testid="fave-no-fill"
        className="fave-no-fill"
        onClick={() => {
          addFavourite(name);
          setIsFilled(true);
        }}
      >
        <i className="bi bi-bookmark-check mx-2 check" />
      </button>
      <div style={{ cursor: "pointer" }} onClick={handleFaveClick}>
        {name}
      </div>
    </h2>
  );
};

export default FavouriteItem;
