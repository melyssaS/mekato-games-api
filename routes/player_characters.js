const router = require("express").Router();
const db = require("../db");

const getIndex = (id) =>
  db.player_characters.findIndex((player) => player.id === id);

router.get("/", (req, res) => {
  res.json(db.player_characters);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const index = getIndex(id);
  if (index > -1) {
    res.json(db.player_characters[index]);
  } else {
    res.status(404).json({ message: "Player Not Found" });
  }
});

router.post("/", (req, res) => {
  const { name, stats, level, title, model, id } = req.body;
  if (name && stats && level && title && model && id) {
    const id = db.players.length;
    db.player_characters.push({
      ...req.body,
      id,
    });
    res.status(200).json({ message: "ok" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { player, ...res } = req.body;
  if (id) {
    const index = getIndex(id);
    db.player_characters[index] = {
      ...res
    };
    res.status(200).json(db.player_characters[index]);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = getIndex(id);
  if (index > -1) {
    db.player_characters.slice(index, 1);
  } else {
    res.status(404).json({ message: "Player Not Found" });
  }
});

module.exports = router;
