const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
    const rawMissions = db.missions;
    const missions = rawMissions.map(m => ({
        ...m,
        objectives: db.mission_objectives.filter(mo => mo.mission === m.id)
    }))
    res.status(200).json({ data: missions })
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const mission = db.missions.find(m => m.id === id);
    if (!mission) {
        return res.status(404).json({ message: `Mission with id ${id} does not exists` });
    }

    const objectives = db.mission_objectives.filter(mo => mo.mission === mission.id)

    res.status(200).json({
        data: {
            ...mission,
            objectives
        }
    });

})

router.post("/", async (req, res) => {
    const len = Object.keys(req.body).length;
    if (len !== 5) {
        return res.status(400).json({ message: `Mission is missing a property` })
    }
    const isAllDefined = Object.keys(req.body).every(k => req.body[k])
    if (!isAllDefined) {
        return res.status(400).json({ message: `One of the properties is not defined` })
    }
    let id = db.missions.length;
    db.missions.push({
        ...req.body,
        id
    })
    res.status(200).json({ data: `Mission ${id} created` });
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const mission = db.missions.find(m => m.id === id);
    if (!mission) {
        return res.status(404).json({ message: `Mission with id ${id} does not exists` });
    }
    let index = db.missions.findIndex(m => m.id === id);
    db.missions[index] = {
        ...db.missions[index],
        ...req.body
    }
    res.status(200).json({ data: `Mission ${id} updated` });
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(500).json({ message: `Id ${id} should be a number` })
    }
    //delete missions
    db.missions = db.missions.filter(m => m.id !== id);
    //delete missions_objectives
    db.mission_objectives = db.mission_objectives.filter(mo => mo.mission !== id)
    res.status(200).json({ data: `Mission ${id} was deleted` })
})

module.exports = router;