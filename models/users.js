const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
  googleID: String,
  displayName: String
});

mongoose.model("users", UsersSchema);
