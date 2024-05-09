const express = require("express");
const cors = require("cors");
const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin to access
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/users", (req, res) => {
  res.json({ id: 1, name: "Hello World!" });
});

app.get("/api/v2/users", (req, res) => {
  res.json({ id: 2, name: "Bye World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
