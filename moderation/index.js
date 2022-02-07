const express = require("express");
const axios = require("axios");
const port = process.env.MODERATION_PORT || 4003;

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.comment.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        comment: data.comment,
        status,
      },
    });
  }
  return res.send({});
});

app.listen(port, () => console.log(`moderation is running on port : ${port}`));
