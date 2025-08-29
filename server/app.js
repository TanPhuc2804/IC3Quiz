const env ={}
require("dotenv").config({processEnv:env})

const express = require("express")
const app = express()
const PORT = env.PORT|| 5000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running with port:"+ PORT`);
})

