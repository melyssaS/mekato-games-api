const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
    res.status(200).json({ data: db.mission_objectives })
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const mission_objective = db.mission_objectives.find(m => m.id === id);
    if (!mission_objective) {
        return res.status(404).json({ message: `Mission Objective with id ${id} does not exists` });
    }

    res.status(200).json({ data: mission_objective });

})

router.post("/", async (req, res) => {
    const len = Object.keys(req.body).length;
    if (len !== 4) {
        return res.status(400).json({ message: `Mission Objective is missing a property` })
    }
    const isAllDefined = Object.keys(req.body).every(k => req.body[k])
    if (!isAllDefined) {
        return res.status(400).json({ message: `One of the properties is not defined` })
    }
    let id = db.mission_objectives.length;
    db.mission_objectives.push({
        ...req.body,
        id
    })
    res.status(200).json({ data: `Mission Objective ${id} created` });
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const missionData = db.mission_objectives.find(m => m.id === id);
    if (!missionData) {
        return res.status(404).json({ message: `Mission with id ${id} does not exists` });
    }
    let index = db.mission_objectives.findIndex(m => m.id === id);
    const { mission, ...rest } = req.body;
    db.mission_objectives[index] = {
        ...db.mission_objectives[index],
        ...rest
    }
    res.status(200).json({ data: `Mission Objective ${id} updated` });
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(500).json({ message: `Id ${id} should be a number` })
    }
    db.mission_objectives = db.mission_objectives.filter(m => m.id !== id);
    res.status(200).json({ data: `Mission Objective ${id} was deleted` })
})

module.exports = router;