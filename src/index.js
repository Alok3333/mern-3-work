const express = require("express");
const passport = require("passport");
const { strategy } = require("./JwtStrategy");

const app = express();
const PORT = 5000;
app.use(express.json());

app.use(passport.initialize());
passport.use("jwt", strategy);

const router = express.Router();

// create a try catch with better way
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn, (req, res, next)).catch((err) => next(err));
};

const getResponse = () => {
  console.log("calling getResponse function");
};

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      message: "From Controllers, Conneted with get request on '/' router",
    });
  }
);

const sampleFunction = catchAsync(async (req, res) => {
  const awaitedResponse = await getResponse();
  res.send(awaitedResponse);
});

router.get("/error", (req, res) => {
  let out = sampleFunction()
  console.log(out, "out")
  res.end()
});

app.use("/bash", router);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
