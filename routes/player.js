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

router.post("/", (req, res) => {
  const { name, last_login, password, username } = req.body;
  if (name && last_login && password && username) {
    const id = db.players.length;
    db.players.push({ ...req.body, id });
  }
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    if(id && req.body){
        
    }
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
