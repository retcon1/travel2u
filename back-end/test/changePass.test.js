import chai from "chai";
import "chai/register-should.js"; // assertion style
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import server from "../server.js";
import { seedDB } from "../db/data/seed.js";

const TESTPATH = "/auth/change-pass";

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

describe("change password test suite", () => {
  it("POST 200: should change the user's password after they have logged in and are given a valid token", async () => {
    // Arrange
    const loginData = {
      username: "johndoe",
      password: "Password123",
    };
    const changePassData = {
      username: "johndoe",
      password: "Password123",
      newPassword: "newPassword1234",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);
    const { token } = login.body.user;

    // Act
    const response = await chai
      .request(server)
      .patch(TESTPATH)
      .set("access-token", token)
      .send(changePassData);

    // Assert
    response.should.have.status(200);
    response.body.should.haveOwnProperty("message").equal("Password updated successfully");
  });

  it("POST 403: should reject the change with a warning if no access token is given", async () => {
    // Arrange

    const changePassData = {
      username: "johndoe",
      password: "Password123",
      newPassword: "newPassword1234",
    };

    // Act
    const response = await chai.request(server).patch(TESTPATH).send(changePassData);

    // Assert
    response.should.have.status(403);
    response.body.should.haveOwnProperty("message").equal("No token provided");
  });

  it("POST 401: should reject the change with a warning if token is invalid", async () => {
    // Arrange

    const changePassData = {
      username: "johndoe",
      password: "Password123",
      newPassword: "newPassword1234",
    };

    // Act
    const response = await chai
      .request(server)
      .patch(TESTPATH)
      .set("access-token", "INVALID.TOKEN")
      .send(changePassData);

    // Assert
    response.should.have.status(401);
    response.body.should.haveOwnProperty("message").equal("Unauthorised");
  });

  it("POST 400: should return a warning if the given password is blank", async () => {
    // Arrange
    const loginData = {
      username: "johndoe",
      password: "Password123",
    };
    const changePassData = {
      username: "johndoe",
      password: "Password123",
      newPassword: "",
    };

    const login = await chai.request(server).post("/auth/login").send(loginData);
    const { token } = login.body.user;

    // Act
    const response = await chai
      .request(server)
      .patch(TESTPATH)
      .set("access-token", token)
      .send(changePassData);

    // Assert
    response.should.have.status(400);
    response.body.should.haveOwnProperty("message").equal("New password is invalid");
  });
});
