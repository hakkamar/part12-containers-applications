const redis = require("../redis");
const express = require("express");
const router = express.Router();

let todoCount = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  todoCount = await redis.getAsync("added_todos");
  const added_todos = todoCount ? todoCount : 0;
  //console.log("added_todos", added_todos);

  res.send({
    added_todos,
  });
});

module.exports = router;
