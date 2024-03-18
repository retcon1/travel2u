import React from "react";
import * as icons from "../../public/assets/weather-icons";

const WeatherToday = ({ todayData }) => {
  const iconName = `icon_${todayData.icon}`;

  return (
    <div data-testid="weather-today-card" className="card weather-today-card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={icons[iconName]} className="card-img" alt={todayData.weather_desc} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Today's Weather</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{todayData.date}</h6>
            <h5 className="card-title mb-2">{todayData.temp}°C</h5>
            <p className="card-text text-capitalize">{todayData.weather_desc}</p>
            <p className="card-text">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherToday;
