const router = require("express").Router();
const db = require("../db");

router.get("/models_3ds", async(req,res) => {
    res.status(200).json({data: db.models_3d})
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const model_3d = db.models_3d.find(m => m.id === id);
    if (!model_3d) {
        return res.status(404).json({ message: `Model_3d with id ${id} does not exists` });
    }

    res.status(200).json({ data: model_3d });

})

router.post("/", async (req, res) => {
    const len = Object.keys(req.body).length;
    if (len !== 1) {
        return res.status(400).json({ message: `Model_3d is missing a property` })
    }
    const isAllDefined = Object.keys(req.body).every(k => req.body[k])
    if (!isAllDefined) {
        return res.status(400).json({ message: `One of the properties is not defined` })
    }
    let id = db.models_3d.length;
    db.models_3d.push({
        ...req.body,
        id
    })
    res.status(200).json({ data: `Model_3d ${id} created` });
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Model_3d ${id} should be a number` })
    }
    const model_3d = db.missions.find(m => m.id === id);
    if (!model_3d) {
        return res.status(404).json({ message: `Model_3d with id ${id} does not exists` });
    }
    let index = db.models_3d.findIndex(c => c.id === id);
    db.models_3d[index] = {
        ...db.models_3d[index],
        ...req.body
    }
    res.status(200).json({ data: `Model_3d ${id} updated` });
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(500).json({ message: `Id ${id} should be a number` })
    }
    db.models_3d = db.models_3d.filter(m => m.id !== id);
    res.status(200).json({ data: `Model_3d ${id} was deleted` })
})


module.exports = router;