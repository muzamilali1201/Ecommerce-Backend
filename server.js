const express = require("express");
const dbConnection = require("./config/dbConnection");
require("dotenv").config();
require("express-async-errors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes/router");

const app = express();
app.use("/public", express.static("public"));
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use("/api/v1", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at Port : ${PORT}`);
});

dbConnection();
