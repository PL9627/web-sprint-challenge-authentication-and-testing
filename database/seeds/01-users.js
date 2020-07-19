exports.seed = async function (knex) {
  await knex("users").insert([{ id: 1, username: "Darcy Lewis", password: "MewMew" }]);
};