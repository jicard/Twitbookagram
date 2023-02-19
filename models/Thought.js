import mongoose, { model } from "mongoose";

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate,
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  function formatDate(createdAt) {
    return new Date(createdAt);
  }
  
  ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = model("Thought", ThoughtSchema);
  
  module.exports = Thought;