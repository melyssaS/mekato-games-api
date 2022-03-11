const router = require("express").Router();
const { images_2d } = require("../db");
const db = require("../db");

router.get("/images_2ds", async(req,res) => {
    res.status(200).json({data: db.images_2d})
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Id ${id} should be a number` })
    }
    const image_2d = db.images_2d.find(c => c.id === id);
    if (!image_2d) {
        return res.status(404).json({ message: `Image_2d with id ${id} does not exists` });
    }

    res.status(200).json({ data: images_2d });

})

router.post("/", async (req, res) => {
    const len = Object.keys(req.body).length;
    if (len !== 1) {
        return res.status(400).json({ message: `Image_2d is missing a property` })
    }
    const isAllDefined = Object.keys(req.body).every(k => req.body[k])
    if (!isAllDefined) {
        return res.status(400).json({ message: `One of the properties is not defined` })
    }
    let id = db.images_2d.length;
    db.images_2d.push({
        ...req.body,
        id
    })
    res.status(200).json({ data: `Image_2d ${id} created` });
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: `Image_2d ${id} should be a number` })
    }
    const image_2d = db.missions.find(m => m.id === id);
    if (!image_2d) {
        return res.status(404).json({ message: `Image_2d with id ${id} does not exists` });
    }
    let index = db.images_2d.findIndex(c => c.id === id);
    db.images_2d[index] = {
        ...db.images_2d[index],
        ...req.body
    }
    res.status(200).json({ data: `Image_2d ${id} updated` });
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(500).json({ message: `Id ${id} should be a number` })
    }
    db.images_2d = db.images_2d.filter(c => c.id !== id);
    res.status(200).json({ data: `Image_2d ${id} was deleted` })
})

module.exports = router;