const router = require("express").Router();
const db = require("../db");

const getIndex = (id) => db.characters_stats.findIndex((player) => player.id === id);

router.get("/", (req, res) => {
  res.json(db.characters_stats);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const index = getIndex(id);
  if (index > -1) {
    res.json(db.characters_stats[index]);
  } else {
    res.status(404).json({ message: "Player Not Found" });
  }
});

router.post("/", (req, res) => {
  const { attribute_1, attribute_2, attribute_3 } = req.body;
  if (attribute_1 && attribute_2 && attribute_3) {
    const id = db.players.length;
    db.characters_stats.push({
      attribute_1,
      attribute_2,
      attribute_3,
      life: 20 * attribute_1,
      power: attribute_1 * 10 + attribute_2 * 25,
      magic: attribute_3 * 100,
      id,
    });
    res.status(200).json({message:"ok"})
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { attribute_1, attribute_2, attribute_3 } = req.body;
  if (id && attribute_1 && attribute_2 && attribute_3) {
    const index = getIndex(id);
    db.characters_stats[index] = {
      ...db.characters_stats[index],
      attribute_1,
      attribute_2,
      attribute_3,
    };
    res.status(200).json(db.characters_stats[index])
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = getIndex(id);
  if (index > -1) {
    db.characters_stats.slice(index, 1);
  } else {
    res.status(404).json({ message: "Player Not Found" });
  }
});

module.exports = router;
