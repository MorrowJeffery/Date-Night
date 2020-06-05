require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);
// Routes
app.use(userRoutes, postRoutes);

// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
