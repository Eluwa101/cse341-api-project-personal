const passport = require("passport");

const router = require("express").Router();

router.use("/students", require("./students.js"));
router.use("/courses", require("./courses.js"));

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
    res.redirect("/");
  });
});

module.exports = router;
