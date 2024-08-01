const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      path: { type: String },
      filename: { type: String },
      mimetype: { type: String }
    },
    title: { type: String, trim: true },
    caption: { type: String, trim: true },
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ]

  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", StorySchema);
module.exports = Story;
