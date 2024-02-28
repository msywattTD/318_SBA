const express = require("express");
const router = express.Router();
const comments = require("../data/comments");

//get all comments
router.get("/", async (req, res) => {
  return res.json(comments);
});

//create a new comment
router.post("/newComment", async (req, res) => {
  const newComment = {
    comment_id: Object.keys(comments).length,
    comment_content: req.body.comment_content,
  };
  comments[newComment.comment_id] = newComment;
  return res.status(201).json(comments);
});

//update a comments's content
router.patch("/updateComment", async (req, res) => {
  const comment = comments[req.body.comment_id];
  if (!comment) {
    res.status(404).json({ message: "Comment does not exist" });
  }
  (comment.comment_id = req.body.comment_id || comment.comment_id),
    (comment.comment_content =
      req.body.comment_content || comment.comment_content);
  res.status(200).json(comments);
});

//delete a Comment

router.delete("/deleteComment", async (req, res) => {
  const comment = comments[req.body.comment_id];
  if (!comment) {
    res.status(404).json({ message: "Comment does not exist" });
  }
  delete comments[req.body.comment_id]; // this bricks comments later on, Would need to find a better solution than outright removing it or a better way to number posts
  return res.status(202).json(comments);
});

module.exports = router;
