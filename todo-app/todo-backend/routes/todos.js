const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();

const redis = require("../redis");

const kasvataCounttia = async () => {
  const value = await redis.getAsync("added_todos");
  //console.log("value", value);
  const nextValue = value ? Number(value) + 1 : 1;
  //console.log("nextValue", nextValue);
  await redis.setAsync("added_todos", nextValue);
};

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  kasvataCounttia();

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  //res.sendStatus(405); // Implement this
  const todo = await Todo.findById(req.todo.id);
  res.send(todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  //res.sendStatus(405); // Implement this
  const todo = {
    text: req.body.text,
    done: req.body.done,
  };
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, todo, {
    new: true,
  });
  res.send(updatedTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
