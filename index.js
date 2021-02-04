const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ msg: "Hello Node, and Heroku!"})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);