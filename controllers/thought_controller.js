import Thought from "../models/Thought";
import User from "../models/User";

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbData) => res.json(dbData))
      .catch((err) => res.sendStatus(400));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbData) => res.json(dbData))
      .catch((err) => res.sendStatus(400));
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbData) => {
        return User.findOneAndUpdate(
          { _id: parmas.userId },
          { $pull: { thoughts: params.Id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },
};

export default thoughtController;