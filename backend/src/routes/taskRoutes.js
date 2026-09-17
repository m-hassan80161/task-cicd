const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks"
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: {
        id: id
      }
    });

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch task"
    });
  }
});



router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required"
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create task"
    });
  }
});




router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { title, description, completed } = req.body;

    const task = await prisma.task.update({
      where: {
        id: id
      },
      data: {
        title,
        description,
        completed
      }
    });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: "Task not found"
    });
  }
});




router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: {
        id: id
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: "Task not found"
    });
  }
});



module.exports = router;