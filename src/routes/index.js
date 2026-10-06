import { Router } from "express";
import testRoutes from "./test.routes.js";
const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

// Auth routes
router.use("/test", testRoutes);

export default router;