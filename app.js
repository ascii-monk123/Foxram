// 3rd party library imports and also user defined libraries
const express = require("express");
const mainRoutes = require("./routes/routes");
const rootDir = require("./utils/path");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(mainRoutes);

app.listen(3000, "localhost");
