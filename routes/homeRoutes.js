const passport = require("passport");

module.exports = app => {
  app.get("/", (req, res) => {
    if (req.user) {
      res.send("Hello " + req.user.displayName);
    } else {
      res.send("Hello stranger login with <a href='/auth/google/'>google</a>!");
    }
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );

  app.get("/api/user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
