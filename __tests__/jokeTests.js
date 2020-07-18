const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

/* describe("Jest test", () => {
  it("checks", () => {
    expect(true).toBeTruthy();
  });
}); */

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("register integration tests", () => {
  it("POST /api/auth/register", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      username: "John Doe",
      password: "password",
    });

    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("John Doe");
    expect(res.body.password).toBe("password");
  });

  it("register (already registered)", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      username: "Darcy Lewis",
    });

    expect(res.statusCode).toBe(409);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.username).toBe("Darcy Lewis");
    expect(res.body.message).toBe("Username is already taken");
  });
});

describe("login integration tests", () => {
  it("logins", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Jane",
      password: "p2"
    })

    expect(res.statusCode).toBe(200)
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(res.body.username).toBe("Jane")
    expect(res.body.password).toBe("p2")
  })

  it("logins (not valid)", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Jake",
      password: "p"
    })

    expect(res.statusCode).toBe(401)
  })
});
