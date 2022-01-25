const port = process.env.QUERY_PORT || 4002;
const express = require("express");
const cors = require("cors");

const app = express();
const posts = {};

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === "CommentCreated") {
    const { id, comment, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, comment });
  }
  return res.send({});
});

app.listen(port, () =>
  console.log(`query service is running on port : ${port}`)
);
