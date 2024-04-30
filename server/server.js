require("dotenv").config();

const express = require("express");
connectDB = require("./src/db/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const users = require("./src/routers/users");
const classlist = require("./src/routers/classlist");
const races = require("./src/routers/races");
const backgrounds = require("./src/routers/background");
const savingthrow = require("./src/routers/savingthrows");
const skills = require("./src/routers/skills");
const roles = require("./src/routers/roles");
const character = require("./src/routers/characters");
const npc = require("./src/routers/npcs");

connectDB();

const limiter = rateLimit({
  windowMs: 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", users);
app.use("/api", roles);
app.use("/api", character);
app.use("/api", classlist);
app.use("/api", races);
app.use("/api", backgrounds);
app.use("/api", savingthrow);
app.use("/api", skills);
app.use("/api", npc);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
