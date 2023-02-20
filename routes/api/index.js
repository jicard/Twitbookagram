import express from "express";
const router = express.Router();
import userRouter from "./user_routes"
import thoughtRouter from "./thought_routes"

router.use("/users", userRouter);
router.use("/thoughts", thoughtRouter);

export default router;
