import chai from "chai";
import "chai/register-should.js"; // assertion style
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import server from "../server.js";
import User from "../models/user.model.js";
import { seedDB } from "../db/data/seed.js";

const TESTPATH = "/auth/signup";

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

describe("signup testing suite", () => {
  it("POST 201: should create a new user with a valid signup", async () => {
    // Arrange
    const signUpData = {
      username: "MyTestName",
      password: "myT3stP4ssword",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(signUpData);

    // Assert
    response.should.have.status(201);

    const { newUser } = response.body;
    newUser.should.be.an("object");
    newUser.should.haveOwnProperty("username").equal(signUpData.username);
    newUser.should.haveOwnProperty("favourites");
    newUser.favourites.should.satisfy(Array.isArray);
    const numberOfUsers = await User.find();
    numberOfUsers.should.have.lengthOf(6);
  });

  it("POST 400: should return an error code if given a blank username", async () => {
    // Arrange
    const signUpData = {
      username: "",
      password: "test",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(signUpData);

    // Assert
    response.should.have.status(400);
    response.body.should
      .haveOwnProperty("message")
      .equal(
        "Username and password are required"
      );
    const numberOfUsers = await User.find();
    numberOfUsers.should.have.lengthOf(5);
  });

  it("POST 400: should return an error code if given a blank password", async () => {
    // Arrange
    const signUpData = {
      username: "test",
      password: "",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(signUpData);

    // Assert
    response.should.have.status(400);
    response.body.should
      .haveOwnProperty("message")
      .equal(
        "Username and password are required"
      );
    const numberOfUsers = await User.find();
    numberOfUsers.should.have.lengthOf(5);
  });

  it("POST 400: should return an error code if the username is already taken", async () => {
    // Arrange
    const signUpData = {
      username: "johndoe",
      password: "mypass123",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(signUpData);

    // Assert
    response.should.have.status(400);
    response.body.should.haveOwnProperty("message").equal("Username Taken");
    const numberOfUsers = await User.find();
    numberOfUsers.should.have.lengthOf(5);
  });
});
