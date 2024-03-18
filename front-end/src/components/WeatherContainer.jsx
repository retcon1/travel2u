import React from "react";
import WeatherToday from "./WeatherToday";
import WeatherBox from "./WeatherBox";

const WeatherContainer = ({ weatherData }) => {
  const todayData = weatherData.days[0];
  const futureDaysData = weatherData.days.slice(1);
  const futureDays = futureDaysData.map((day) => {
    return <WeatherBox key={new Date(day.date).getDay()} dayData={day} />;
  });

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <WeatherToday todayData={todayData} />
      </div>
      <div className="row justify-content-center align-items-center">{futureDays}</div>
    </div>
  );
};

export default WeatherContainer;
