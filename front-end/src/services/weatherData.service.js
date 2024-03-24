import axios from "axios";

const appAPI = axios.create({
  baseURL: `https://travel2u-api.onrender.com/weather`,
});

export const getWeatherData = async (location) => {
  try {
    const response = await appAPI.get(`/${location}`);
    const { name, days, coords } = response.data.weather;
    return { name, days, coords };
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
};
