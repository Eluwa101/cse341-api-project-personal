const passport = require("passport");

const router = require("express").Router();

router.use("/students", require("./students.js"));
router.use("/courses", require("./courses.js"));

// basic home route so OAuth redirects have a landing page
router.get("/", (req, res) => {
  res.send("API is running. Try /api-docs or /login.");
});

router.get("/login", (req, res) => {
  res.redirect("/github");
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/");
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // Destroy session and clear cookie to fully log out of the app
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      const wantsJson = req.accepts(["html", "json"]) === "json";
      if (wantsJson) {
        return res.status(200).json({ message: "Logged out" });
      }
      res.redirect("/");
    });
  });
});

module.exports = router;
