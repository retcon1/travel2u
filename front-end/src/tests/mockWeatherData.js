const mockWeatherData = {
  name: "London",
  days: [
    {
      date: "2024-02-29 18:00:00",
      weather_desc: "moderate rain",
      icon: "10n",
      temp: 8.06,
    },
    {
      date: "2024-03-01 15:00:00",
      weather_desc: "light rain",
      icon: "10d",
      temp: 7.38,
    },
    {
      date: "2024-03-02 15:00:00",
      weather_desc: "broken clouds",
      icon: "04d",
      temp: 7.89,
    },
    {
      date: "2024-03-03 15:00:00",
      weather_desc: "overcast clouds",
      icon: "04d",
      temp: 7.38,
    },
    {
      date: "2024-03-04 15:00:00",
      weather_desc: "light rain",
      icon: "10d",
      temp: 10.44,
    },
  ],
  coords: { lat: 51.5085, long: -0.1257 },
};

export default mockWeatherData;
