const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach( async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

