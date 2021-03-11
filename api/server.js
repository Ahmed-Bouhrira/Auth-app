const express = require("express");
require("dotenv").config();
const path = require("path");
const { User } = require("./db/models/users");
const usersDB = require("../utils/users")();
const Message = require("../models/Message")();

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
var io = require("socket.io")(http);

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

io.on("connection", socket => {
  socket.on("createUser", user => {
    usersDB.addUser({
      ...user,
      id: socket.id
    });

    return { id: socket.id };
  });

  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
    socket.emit("newMessage", new Message("admin", `Hello, ${name}`));
    socket.broadcast
      .to(room)
      .emit(
        "newMessage",
        new Message("admin", `User ${name} connected to chat`)
      );
  });

  socket.on("createMessage", ({ id, msg }) => {
    const user = usersDB.getUser(id);
    if (user) {
      io.to(user.room).emit("newMessage", new Message(user.name, msg, id));
    }
  });

  socket.on("setTypingStatus", ({ room, typingStatus, id }) => {
    usersDB.setTypingStatus(id, typingStatus);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
  });

  const exitEvents = ["leftChat", "disconnect"];

  exitEvents.forEach(event => {
    socket.on(event, () => {
      const id = socket.id;
      const user = usersDB.getUser(id);
      if (!user) return;
      const { room, name } = user;
      usersDB.removeUser(id);
      socket.leave(room);
      io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
      io.to(room).emit(
        "newMessage",
        new Message("admin", `User ${name} left chat`)
      );
    });
  });
});
module.exports = {
  app,
  http
};
