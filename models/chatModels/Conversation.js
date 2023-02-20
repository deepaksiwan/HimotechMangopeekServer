const mongoose = require("mongoose");
// {
//   members: [
//     {
//       senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Profile",
//       },
//       receiverId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Profile",
//       },
//     },
//   ],
  
// },
// { timestamps: true }


const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type:Array,
    },
  //   members:[{
  //     senderId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Profile",
  //     },
  //     receiverId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Profile",
  //     },
  // }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);