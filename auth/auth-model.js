const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users"), select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}
