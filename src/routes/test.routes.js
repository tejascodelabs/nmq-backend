import express from "express";
import db from "../config/index.js";
import { test } from "../config/schema.js";

const router = express.Router();

// GET all test users
router.get("/", async (req, res) => {
  try {
    const data = await db.select().from(test);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET TEST ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch test data",
      error: error.message,
    });
  }
});

// POST test user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const result = await db.insert(test).values({
      name,
      email,
    });

    res.status(201).json({
      success: true,
      message: "Test user created successfully",
      data: result,
    });
  } catch (error) {
    console.error("POST TEST ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create test user",
      error: error.message,
    });
  }
});

export default router;