const router = require("express").Router();
const db = require("../db");

router.get("/characters", async(req,res) => {
    res.status(200).json({data: db.characters})
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const character = db.characters.find(c => c.id === id);
    if (!character) {
        return res.status(404).json({ message: `Character with id ${id} does not exists` });
    }

    res.status(200).json({ data: character });

})

router.post("/", async (req, res) => {
    const len = Object.keys(req.body).length;
    if (len !== 5) {
        return res.status(400).json({ message: `Character is missing a property` })
    }
    const isAllDefined = Object.keys(req.body).every(k => req.body[k])
    if (!isAllDefined) {
        return res.status(400).json({ message: `One of the properties is not defined` })
    }
    let id = db.characters.length;
    db.characters.push({
        ...req.body,
        id
    })
    res.status(200).json({ data: `Character ${id} created` });
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const character = db.missions.find(m => m.id === id);
    if (!character) {
        return res.status(404).json({ message: `Character with id ${id} does not exists` });
    }
    let index = db.characters.findIndex(c => c.id === id);
    db.characters[index] = {
        ...db.characters[index],
        ...req.body
    }
    res.status(200).json({ data: `Character ${id} updated` });
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(500).json({ message: `Id ${id} should be a number` })
    }
    db.characters = db.characters.filter(c => c.id !== id);
    res.status(200).json({ data: `Character ${id} was deleted` })
})

module.exports = router;