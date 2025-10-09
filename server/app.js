const env = {}
require("dotenv").config({ processEnv: env })

const express = require("express")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const { errorHandler } = require("./midlewares/errorHandler")
const app = express()
const PORT = env.PORT || 5000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(cookieParser());

// Import routes
const examRoutes = require("./routes/exam")
const questionRoutes = require("./routes/question")
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth");
const packageRoutes = require("./routes/package")
const paymentRoutes = require("./routes/payment")
// Routes
app.use("/api/exams", examRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/packages", packageRoutes)
app.use("/api/payment",paymentRoutes )
app.use(errorHandler)

// Connect to MongoDB
mongoose.connect(env.URL_DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.listen(PORT, () => {
    console.log(`Server is running with port:"+ ${PORT}`);
})

