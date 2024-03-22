import chai from "chai";
import "chai/register-should.js"; // assertion style
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import server from "../server.js";
import { seedDB } from "../db/data/seed.js";

const TESTPATH = "/favourites";

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

describe("favourites testing suite", () => {
  it("PATCH 201: should add a valid favourite after logging in", async () => {
    // Arrange
    const loginData = {
      username: "johndoe",
      password: "Password123",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);

    const { token } = login.body.user;

    const addFaveData = {
      newFave: "Tokyo",
    };

    // Act
    const response = await chai
      .request(server)
      .patch(TESTPATH)
      .set("access-token", token)
      .send(addFaveData);

    // Assert
    response.should.have.status(201);

    response.body.should.haveOwnProperty("user");
    const { user } = response.body;
    user.should.haveOwnProperty("favourites").with.lengthOf(1);
    user.favourites[0].should.equal("Tokyo");
  });

  it("PATCH 400: should return an error message if given a blank favourite", async () => {
    // Arrange
    const loginData = {
      username: "johndoe",
      password: "Password123",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);

    const { token } = login.body.user;

    const addFaveData = {
      newFave: "",
    };

    // Act
    const response = await chai
      .request(server)
      .patch(TESTPATH)
      .set("access-token", token)
      .send(addFaveData);

    // Assert
    response.should.have.status(400);
    response.body.should.haveOwnProperty("message").equal("Invalid favourite");
  });

  it("PATCH 400: should return an error message if given a non-string favourite", async () => {
    // Arrange
    const loginData = {
      username: "johndoe",
      password: "Password123",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);

    const { token } = login.body.user;

    const addFaveData = {
      newFave: 1234,
    };

    // Act
    const response = await chai
      .request(server)
      .patch(TESTPATH)
      .set("access-token", token)
      .send(addFaveData);

    // Assert
    response.should.have.status(400);
    response.body.should.haveOwnProperty("message").equal("Invalid favourite");
  });

  it("DELETE 200: should delete the given, valid favourite", async () => {
    // Arrange
    const loginData = {
      username: "janedoe",
      password: "StrongPassword123",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);

    const { token } = login.body.user;

    const removeFaveData = {
      faveToRemove: "London",
    };

    // Act
    const response = await chai
      .request(server)
      .delete(TESTPATH)
      .set("access-token", token)
      .send(removeFaveData);

    // Assert
    response.should.have.status(200);

    response.body.should.haveOwnProperty("user");
    const { user } = response.body;
    user.should.haveOwnProperty("favourites").with.lengthOf(1);
    user.favourites[0].should.equal("New York");
  });

  it("DELETE 400: should return an error message if given a blank favourite", async () => {
    // Arrange
    const loginData = {
      username: "janedoe",
      password: "StrongPassword123",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);

    const { token } = login.body.user;

    const removeFaveData = {
      faveToRemove: "",
    };

    // Act
    const response = await chai
      .request(server)
      .delete(TESTPATH)
      .set("access-token", token)
      .send(removeFaveData);

    // Assert
    response.should.have.status(400);
    response.body.should.haveOwnProperty("message").equal("Invalid favourite");
  });

  it("DELETE 400: should return an error message if given a non-string favourite", async () => {
    // Arrange
    const loginData = {
      username: "janedoe",
      password: "StrongPassword123",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);

    const { token } = login.body.user;

    const removeFaveData = {
      faveToRemove: 1234,
    };

    // Act
    const response = await chai
      .request(server)
      .delete(TESTPATH)
      .set("access-token", token)
      .send(removeFaveData);

    // Assert
    response.should.have.status(400);
    response.body.should.haveOwnProperty("message").equal("Invalid favourite");
  });

  it("GET 200: should return the user's favourites", async () => {
    // Arrange
    const loginData = {
      username: "janedoe",
      password: "StrongPassword123",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);

    const { token } = login.body.user;

    // Act
    const response = await chai.request(server).get(TESTPATH).set("access-token", token);

    // Assert
    response.should.have.status(200);

    response.body.should.haveOwnProperty("favourites");
    const { favourites } = response.body;
    favourites.should.be.an("array").with.lengthOf(2);
    favourites.should.deep.equal(["London", "New York"]);
  });
});
