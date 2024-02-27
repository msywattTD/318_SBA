const express = require("express");
const router = express.Router();
const users = require("../data/users");

//get all users
router.get("/", async (req, res) => {
  return res.json(users);
});

//create a new user
router.post("/newUser", async (req, res) => {
  const newUser = {
    user_id: Object.keys(users).length,
    user_first: req.body.first,
    user_last: req.body.last,
    user_handle: req.body.handle,
  };
  users[newUser.user_id] = newUser;
  res.status(201).json(users);
});

//update a user's info

router.patch("/updateUser", async (req, res) => {
  const user = users[req.body.user_id];
  if (!user) {
    res.status(404).json({ message: "No User data" });
  }
  (user.user_first = req.body.first || user.user_first),
    (user.user_last = req.body.last || user.user_last),
    (user.user_handle = req.body.handle || user.user_handle);
  res.status(200).json(users);
});

//delete a user

router.delete("/deleteUser", async (req, res) => {
  const user = users[req.body.user_id];
  if (!user) {
    res.status(404).json({ message: "No User data" });
  }
  delete users[req.body.user_id];
  return res.status(202).json(users);
});

module.exports = router;
