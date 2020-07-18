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
    const res = await supertest(server).post("/api/auth/register").send(
      {
        username: "John Doe",
        password: "password",
      }
    );

    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("John Doe");
    expect(res.body.password).toBe("password"); 
  });
});
