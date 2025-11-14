"use strict";

var env = {};
require("dotenv").config({
  processEnv: env
});
var express = require("express");
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var _require = require("./midlewares/errorHandler"),
  errorHandler = _require.errorHandler;
var app = express();
var PORT = env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

// Import routes
var examRoutes = require("./routes/exam");
var questionRoutes = require("./routes/question");
var userRoutes = require("./routes/user");
var authRoutes = require("./routes/auth");
var packageRoutes = require("./routes/package");
var paymentRoutes = require("./routes/payment");
// Routes
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/payment", paymentRoutes);
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(env.URL_DATABASE).then(function () {
  console.log("Connected to MongoDB");
})["catch"](function (error) {
  console.error("Error connecting to MongoDB:", error);
});
app.listen(PORT, function () {
  console.log("Server is running with port:\"+ ".concat(PORT));
});