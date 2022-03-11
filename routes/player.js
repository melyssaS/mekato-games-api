const router = require("express").Router();
const db = require("../db");

const getIndex = (id) => db.players.findIndex((player) => player.id === id);

router.get("/", (req, res) => {
  res.json(db.players);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const index = getIndex(id);
  if (index > -1) {
    res.json(db.players[index]);
  } else {
    res.status(404).json({ message: "Player Not Found" });
  }
});

router.get("/characters/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const player_characters = db.player_characters.filter(
      (character) => character.id === id
    );
    res.status(200).json(player_characters);
  }
});

router.post("/", (req, res) => {
  const { name, last_login, password, username } = req.body;
  if (name && last_login && password && username) {
    const id = db.players.length;
    db.players.push({ ...req.body, id });
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: `Id ${id} should be a number` });
  }
  const player = db.players.find((m) => m.id === id);
  if (!player) {
    return res
      .status(404)
      .json({ message: `Mission with id ${id} does not exists` });
  }
  let index = db.players.findIndex((m) => m.id === id);
  const { last_login } = req.body;
  if (!last_login) {
    db.players[index] = {
      ...db.players[index],
      ...req.body,
    };
  }
  res.status(200).json({ data: `Mission ${id} updated` });
});

router.put("/login/:id", (req, res) => {
  const { id } = req.params;
  const { last_login } = req.body;
  if (id && last_login) {
    const index = getIndex(id);
    if (index > -1) {
      db.players[index] = { ...db.players[index], last_login };
    }
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = getIndex(id);
  if (index > -1) {
    db.players.slice(index, 1);
  } else {
    res.status(404).json({ message: "Player Not Found" });
  }
});

module.exports = router;
