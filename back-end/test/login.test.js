import chai from "chai";
import "chai/register-should.js"; // assertion style
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import server from "../server.js";
import { seedDB } from "../db/data/seed.js";

const TESTPATH = "/auth/login";

chai.use(chaiHttp);

beforeEach(async () => {
  try {
    await seedDB();
  } catch (err) {
    console.error(`Error clearing: ${err}`);
  }
});

// Close local DB connection after all tests run
after(async () => {
  await mongoose.connection.close();
});

describe("login testing suite", () => {
  it("POST 200: should login the user when given a valid username and password", async () => {
    // Arrange
    const loginData = {
      username: "johndoe",
      password: "Password123",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(loginData);

    // Assert
    response.should.have.status(200);
    const { user } = response.body;
    user.should.be.an("object");
    user.should.haveOwnProperty("username").equal(loginData.username);
    user.should.not.haveOwnProperty("password");
    user.should.haveOwnProperty("favourites");
    user.should.haveOwnProperty("token");
    user.favourites.should.satisfy(Array.isArray);
  });

  it("POST 404: should return an error message if the username is not found", async () => {
    // Arrange
    const loginData = {
      username: "johnDoesNotExist",
      password: "Password123",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(loginData);

    // Assert
    response.should.have.status(404);
    response.body.should.haveOwnProperty("message").equal("Username not found");
  });

  it("POST 400: should return an error message if the password is incorrect", async () => {
    // Arrange
    const loginData = {
      username: "johndoe",
      password: "notMyPass",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(loginData);

    // Assert
    response.should.have.status(400);
    response.body.should.haveOwnProperty("message").equal("Incorrect Password");
  });
});
