import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchContainer from "./components/SearchContainer";
import { Route, Routes } from "react-router-dom";
import SearchResult from "./components/SearchResult";
import { useEffect, useState } from "react";
import Favourites from "./components/Favourites";
import { getFavourites } from "./services/favourites.service";
import Auth from "./components/Auth";

const App = () => {
  const [currentFavourites, setCurrentFavourites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [user, setUser] = useState(() => {
    // Try to get the user from localStorage when initializing state
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    setCurrentFavourites(getFavourites());
  }, []);

  return (
    <>
      <Header
        setWeatherData={setWeatherData}
        location={location}
        setLocation={setLocation}
        currentFavourites={currentFavourites}
      />
      <div className="app">
        <Routes>
          <Route
            index
            element={
              <SearchContainer
                setWeatherData={setWeatherData}
                location={location}
                setLocation={setLocation}
              />
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route
            path="/search/:location"
            element={
              <SearchResult weatherData={weatherData} setCurrentFavourites={setCurrentFavourites} />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                currentFavourites={currentFavourites}
                setWeatherData={setWeatherData}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
