import chai from "chai";
import "chai/register-should.js"; // assertion style
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import server from "../server.js";

const TESTPATH = "/weather";

chai.use(chaiHttp);

// Close local DB connection after all tests run
after(async () => {
  await mongoose.connection.close();
});

describe("weather testing suite", () => {
  it("GET 200: should return a weather object containing the coordinates and weather details for the next 5 days", async () => {
    // Arrange
    const location = "Tokyo";

    // Act
    const response = await chai.request(server).get(`${TESTPATH}/${location}`);

    // Assert
    response.should.have.status(200);
    const { weather } = response.body;
    weather.name.should.be.a("string").equal(location);
    weather.should.be.a("object");
    weather.should.have.property("coords");
    weather.should.have.property("days").with.lengthOf(5);

    weather.days.forEach((day) => {
      day.should.have.property("date").that.is.a("string");
      day.should.have.property("weather_desc").that.is.a("string");
      day.should.have.property("icon").that.is.a("string");
      day.should.have.property("temp").that.is.a("number");
    });
  });

  it("GET 404: should return a 404 status for a non-existent location", async () => {
    const location = "nonexistentlocation";
    const response = await chai.request(server).get(`${TESTPATH}/${location}`);
    response.should.have.status(404);
    response.body.message.should.equal("Location not found");
  });

  // Test that the endpoint returns a 400 status for a missing location parameter
  it("GET 400: should return a 400 status for a missing location parameter", async () => {
    const response = await chai.request(server).get(`${TESTPATH}/`);
    response.should.have.status(400);
  });
});
