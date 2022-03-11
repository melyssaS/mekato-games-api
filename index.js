const express = require('express');
const app = express();
const morgan = require("morgan");
const characterStatsRouter = require("./routes/character_stat");
const characterRouter = require("./routes/character");
const images2DRouter = require("./routes/images_2d");
const itemRouter = require("./routes/item");
const missionObjectiveRouter = require("./routes/mission_objective");
const missionRouter = require("./routes/mission");
const models3DRouter = require("./routes/models_3d");
const playerRouter = require("./routes/player");

app.use(morgan("tiny"));

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/character_stats", characterStatsRouter);
app.use("/characters", characterRouter);
app.use("/images_2d", images2DRouter);
app.use("/items", itemRouter);
app.use("/mission_objectives", missionObjectiveRouter);
app.use("/missions", missionRouter);
app.use("/models_3d", models3DRouter);
app.use("/players", playerRouter);

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Success' })
});

app.listen(PORT, () => {
    console.log("Server listening")
})
