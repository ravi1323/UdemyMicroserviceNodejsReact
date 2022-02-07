const port = process.env.COMMENT_PORT || 4001;
const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const { default: axios } = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostsId = {};

// fatching individual post's comments.
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostsId[req.params.id] || []);
});

// creating comment for individual post.
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment } = req.body;
  const comments = commentsByPostsId[req.params.id] || [];
  comments.push({ id: commentId, comment, status: "pending" });
  commentsByPostsId[req.params.id] = comments;

  await axios.post(`http://localhost:4005/events`, {
    type: "CommentCreated",
    data: {
      id: commentId,
      comment,
      postId: req.params.id,
      status: "pending",
    },
  });

  return res.status(201).send(comments);
});

// listening to event-bus.
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, status, comment } = data;
    const comments = commentsByPostsId[postId];
    const post_comment = comments.find((comment) => {
      return comment.id === id;
    });
    post_comment.status = status;
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        postId,
        id,
        comment,
        status,
      },
    });
  }
});

app.listen(port, () =>
  console.log(`Comment service is running on port : ${port}`)
);
