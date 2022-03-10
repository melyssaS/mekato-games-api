const express = require('express');
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Success' })
});

app.listen(PORT, () => {
    console.log("Server listening")
})