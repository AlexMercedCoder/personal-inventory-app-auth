// load .env vars
require("dotenv").config;

// import dependencies
const express = require("express"); //framework
const morgan = require("morgan"); // logger
const methodOverride = require("method-override"); // override form posts
const session = require("express-session"); // middleware for managing session cookies
const connectMongo = require("connect-mongo"); // middleware for storing sessions in mongo

// Import Routers
const sampleRouter = require("./controllers/sample");

// get PORT, DATABASE_URL and SECRET variables from .env
const { PORT = 3000, DATABASE_URL, SECRET = "default" } = process.env;

// Create Express App Object
const app = express();

// Register Middleware
app.use(morgan("dev")); // logger
app.use(express.static("public")); // static folder for serving static assets
app.use(methodOverride("_method")); // override method with _method url query
app.use(express.urlencoded({ extended: true })); // parse urlencoded bodies
app.use(express.json()); // parse JSON bodies
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    store: connectMongo.create({ mongoUrl: DATABASE_URL }),
  })
); // enable session cookies (store data in req.session between requests)

// Register Routes
app.use("/samples", sampleRouter);

// main route for "/" (all other routes should be handled by routers)
app.get("/", (req, res) => {
  res.send("Server is Working");
});

// turn on server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
