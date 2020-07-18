exports.seed = async function (knex) {
  await knex("users").insert([{ username: "Darcy Lewis", password: "MewMew" }]);
};
