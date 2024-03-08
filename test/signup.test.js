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
    newUser.should.haveOwnProperty("password").not.equal(signUpData.username); // due to hashing
  });

  it("POST 400: should return an error code if given a blank username or password", async () => {
    // Arrange
    const signUpData = {
      username: "",
      password: "",
    };

    // Act
    const response = await chai.request(server).post(TESTPATH).send(signUpData);

    // Assert
    response.should.have.status(400);
    response.body.should
      .haveOwnProperty("message")
      .equal(
        "User validation failed: username: Path `username` is required., password: Path `password` is required."
      );
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
  });
});
