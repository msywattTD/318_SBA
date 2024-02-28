const express = require("express");
const router = express.Router();
const threads = require("../data/threads");

//get all threads
router.get("/", async (req, res) => {
  return res.json(threads);
});

//create a new thread
router.post("/newThread", async (req, res) => {
  const newThread = {
    thread_id: Object.keys(threads).length,
    comments: req.body.comments,
  };
  threads[newThread.thread_id] = newThread;
  return res.status(201).json(threads);
});

//update a threads's info
//this has no realistic function
router.patch("/updateThread", async (req, res) => {
  const thread = threads[req.body.thread_id];
  if (!thread) {
    res.status(404).json({ message: "Thread has been deleted" });
  }
  (thread.thread_id = req.body.thread_id || thread.thread_id),
    (thread.comments = req.body.comments || thread.comments);
  res.status(200).json(threads);
});

//delete a thread

router.delete("/deleteThread", async (req, res) => {
  const thread = threads[req.body.thread_id];
  if (!thread) {
    res.status(404).json({ message: "Thread has been deleted" });
  }
  delete threads[req.body.thread_id];
  return res.status(202).json(threads);
});

module.exports = router;
