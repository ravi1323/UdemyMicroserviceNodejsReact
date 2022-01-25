const express = require("express");
const axios = require("axios");
const port = process.env.MODERATION_PORT || 4003;

const app = express();

app.post("/events", (req, res) => {});

app.listen(port, () => console.log(`moderation is running on port : ${port}`));
