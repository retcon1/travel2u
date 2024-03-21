import React from "react";
import * as icons from "../assets/weather-icons";

const WeatherBox = ({ dayData }) => {
    const iconName = `icon_${dayData.icon}`;

    return (
        <div data-testid="weather-card" className="card weather-card m-1">
            <img src={icons[iconName]} className=" card-img" alt={dayData.weather_desc} />
            <div className="card-body">
                <h5 className="card-title">{dayData.temp}°C</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    {dayData.date.slice(0, 10)}
                </h6>
                <p className="card-text text-capitalize">{dayData.weather_desc}</p>
            </div>
        </div>
    );
};

export default WeatherBox;
