import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWeatherData } from "../services/weatherData.service";

const SearchContainer = ({ setWeatherData, location, setLocation }) => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    const data = await getWeatherData(location);
    if (!data) {
      setLoading(false);
      setNotFound(true);
    } else {
      setWeatherData(data);
      navigate(`/search/${location}`);
    }
  };

  return (
    <form className="container mt-5">
      <div className="mb-3 d-flex row justify-content-center align-items-center text-center">
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="mb-4">Tell me about...</h1>
          {loading ? (
            <img
              src="./spinner.svg"
              alt="loading spinner"
              style={{ width: "30px", height: "30px", marginLeft: "10px", marginBottom: "20px" }}
            />
          ) : (
            ""
          )}
        </div>
        {loading ? <h2>This may take some time...</h2> : ""}
        {notFound ? <h2>Oops, that place wasn't found, please try again!</h2> : ""}
        <div className="col-md-6 mx-auto">
          <input
            type="search"
            className="form-control"
            name="location"
            placeholder="Location name..."
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={location < 1}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchContainer;
