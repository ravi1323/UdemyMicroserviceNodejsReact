const port = process.env.EVENT_BUS_PORT || 4005;
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// Emitting events to all services.
app.post("/events", (req, res) => {
  const event = req.body;

  axios.post(`http://localhost:4000/events`, event);
  axios.post(`http://localhost:4001/events`, event);
  axios.post(`http://localhost:4002/events`, event);
  return res.send({ status: "OK" });
});

app.listen(4005, () => console.log(`event-bus running on port : ${port}`));
