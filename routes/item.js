const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
    res.status(200).json({ data: db.items })
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const item = db.items.find(m => m.id === id);
    if (!item) {
        return res.status(404).json({ message: `Item with id ${id} does not exists` });
    }

    res.status(200).json({ data: item });

})

router.post("/", async (req, res) => {
    const len = Object.keys(req.body).length;
    if (len !== 5) {
        return res.status(400).json({ message: `Item is missing a property` })
    }
    const isAllDefined = Object.keys(req.body).every(k => req.body[k])
    if (!isAllDefined) {
        return res.status(400).json({ message: `One of the properties is not defined` })
    }
    let id = db.items.length;
    db.items.push({
        ...req.body,
        id
    })
    res.status(200).json({ data: `Item ${id} created` });
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const item = db.items.find(m => m.id === id);
    if (!item) {
        return res.status(404).json({ message: `Item with id ${id} does not exists` });
    }
    let index = db.items.findIndex(m => m.id === id);
    db.items[index] = {
        ...db.items[index],
        ...req.body
    }
    res.status(200).json({ data: `Item ${id} updated` });
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(500).json({ message: `Id ${id} should be a number` })
    }
    db.items = db.items.filter(m => m.id !== id);
    res.status(200).json({ data: `Item ${id} was deleted` })
})

module.exports = router;