import axios from "axios";

const appAPI = axios.create({
  baseURL: `http://api.openweathermap.org/data/2.5/`,
});
const apiKey = "670149bcfffbbbfd8319ef315957fa42";

// returns array with Indices of the next five days in the list from the API data (every day at 12:00 pm)
const getDayIndices = (data) => {
  let dayIndices = [0];
  let currentDay = data.list[0].dt_txt.slice(8, 10);

  for (let i = 1; i < data.list.length; i++) {
    let day = data.list[i].dt_txt.slice(8, 10);
    let hour = data.list[i].dt_txt.slice(11, 13);

    if (day !== currentDay && hour === "15") {
      dayIndices.push(i);
      currentDay = day;

      // Stop after finding 4 different days
      if (dayIndices.length === 5) {
        break;
      }
    }
  }
  return dayIndices;
};

const getDays = (data) => {
  const tempDays = [];
  const dayIndices = getDayIndices(data);

  for (let i = 0; i < 5; i++) {
    const currentData = data.list[dayIndices[i]];
    tempDays.push({
      date: currentData.dt_txt,
      weather_desc: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      temp: Math.round((currentData.main.temp - 273.15) * 100) / 100,
    });
  }
  return tempDays;
};

export const getWeatherData = async (location) => {
  try {
    const response = await appAPI.get(`forecast?q=${location}&APPID=${apiKey}`);
    const coords = { lat: response.data.city.coord.lat, long: response.data.city.coord.lon };
    const days = getDays(response.data);
    const name = response.data.city.name;
    return { name, days, coords };
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
};
