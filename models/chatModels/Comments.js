

const mongoose = require("mongoose");
const CommentsSchema = new mongoose.Schema(
  {
   
   comment:{
      text:{
        type:String,
         required:"Please comment"
      },
     userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Profile"
     } 
   }


  },
  { timestamps: true }
);
module.exports = mongoose.model("Comments", CommentsSchema);