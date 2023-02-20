import express from "express";
const router = express.Router();
import thoughtController from "../../controllers/thought_controller";

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = thoughtController;

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .post(createReaction)
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

export default router;