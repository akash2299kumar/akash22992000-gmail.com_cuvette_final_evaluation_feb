const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo Db Connection Successfull");
});

db.on("error", () => {
  console.log("Mongo Db Connection Failed");
});
