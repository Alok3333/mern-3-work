const express = require("express");
const passport = require("passport");
const { strategy } = require("./JwtStrategy");

const app = express();
const PORT = 5000;
app.use(express.json());

app.use(passport.initialize());
passport.use("jwt", strategy);

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      message: "From Controllers, Conneted with get request on '/' router",
    });
  }
);

app.use("/bash", router);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
