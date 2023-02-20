import express from "express";
const router = express.Router();
import apiRoutes from "./api"

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h2>404 Error</h2>");
});

export default router;
