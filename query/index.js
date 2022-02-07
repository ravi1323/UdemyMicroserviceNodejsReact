const port = process.env.QUERY_PORT || 4002;
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const posts = {};

app.use(cors());
app.use(express.json());

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === "CommentCreated") {
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }

  if (type === "CommentUpdated") {
    console.log("comment updated");
    const { id, postId, status, comment } = data;
    const post = posts[postId];
    const post_comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    post_comment.status = status;
    post_comment.comment = comment;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  return res.send({});
});

app.listen(port, async () => {
  console.log(`query service is running on port : ${port}`);
  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    handleEvents(event.type, event.data);
  }
});
