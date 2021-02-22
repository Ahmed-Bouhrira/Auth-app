const express = require("express");
require("dotenv").config();
const path = require("path");
const { User } = require("./db/models/users");

const port = process.env.PORT || 3000;
let isProd = process.env.NODE_ENV === "production";
const app = require("./index");
if (isProd) {
  let pth = path.join(__dirname, "../dist");
  app.use(express.static(pth));
} else {
  const { Nuxt, Builder } = require("nuxt");

  const config = require("../nuxt.config.js");
  config.dev = !isProd;

  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
  }
  app.use(nuxt.render);
}
var http = require("http").createServer(app);

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
