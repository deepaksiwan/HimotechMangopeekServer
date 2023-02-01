

const mongoose = require("mongoose");



const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },

    comments: [{
      text: String,
      postedBy: {type:mongoose.Schema.Types.ObjectId,ref:"Profile"}
    }],
    postedBy: {type:mongoose.Schema.Types.ObjectId,ref:"Profile"}

  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);