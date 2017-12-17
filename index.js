const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const CookieSession = require("cookie-session");
require("./models/users");
require("./services/passport");

mongoose.connect(keys.MONGO_URI);

const app = express();

app.use(
  CookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/homeRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
