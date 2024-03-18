import axios from "axios";
import { getDays } from "../utils/weatherUtils.js";

const appAPI = axios.create({
  baseURL: `http://api.openweathermap.org/data/2.5/`,
});
const apiKey = "670149bcfffbbbfd8319ef315957fa42";

export const getWeather = async (req, res) => {
  const { location } = req.params;
  if (!location) return res.status(400).json({ message: "Location parameter is missing" });

  try {
    const response = await appAPI.get(`forecast?q=${location}&APPID=${apiKey}`);
    const coords = { lat: response.data.city.coord.lat, long: response.data.city.coord.lon };
    const days = getDays(response.data);
    const name = response.data.city.name;
    res.status(200).json({ weather: { name, days, coords } });
  } catch (err) {
    return res.status(404).json({ message: "Location not found" });
  }
};
