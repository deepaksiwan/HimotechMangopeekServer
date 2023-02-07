const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    
      // members:[{
      //   senderId:{
      //     type: String
      //   },
      //   receiverId:{
      //     type: String
      //   }
      // }]
        
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);