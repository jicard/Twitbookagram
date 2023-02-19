const router = require("express").Router();
const thoughtControllers = require("../../controllers/thought_controller");

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = thoughtControllers;

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .post(createReaction)
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;