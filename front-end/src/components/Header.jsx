import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";
import { getWeatherData } from "../services/weatherData.service";

const Header = ({ setWeatherData, location, setLocation, currentFavourites }) => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = async (e) => {
    e.preventDefault();
    setNotFound(false);
    const data = await getWeatherData(location);
    if (!data) {
      setNotFound(true);
    } else {
      setWeatherData(data);
      navigate(`/search/${location}`);
    }
  };

  const handleFaveClick = async (e) => {
    e.preventDefault();
    const data = await getWeatherData(e.target.textContent);
    setWeatherData(data);
    navigate(`/search/${e.target.textContent}`);
  };

  const handleLogout = () => {
    localStorage.setItem("user", null);
  };

  useEffect(() => {}, [currentFavourites]);

  const dropdownFaves = currentFavourites.slice(0, 5).map((name, index) => {
    return (
      <a className="dropdown-item" onClick={handleFaveClick} key={index} href="#">
        {name}
      </a>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary header">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="travel logo" className="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li
              className={`nav-item dropdown ${
                currentFavourites.length > 0 ? "" : "visually-hidden"
              }`}
            >
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                My Saved Locations
              </a>
              <div
                className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {dropdownFaves}
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/favourites">
                  All Favourites
                </a>
              </div>
            </li>
            {user ? (
              <>
                <li className="m-2">Logged in as: {user.username}</li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/login">
                  Login
                </a>
              </li>
            )}
          </ul>
          {notFound ? <p className="mt-3 mx-4">That place wasn't found, please try again!</p> : ""}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Location name..."
              aria-label="Search"
              id="top-search"
              name="location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleSearch}
              disabled={location < 1}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
