const server = require("./api/server.js");

const port = process.env.PORT || 3300;

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
