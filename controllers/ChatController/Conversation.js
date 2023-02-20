
const Conversation = require("../../models/chatModels/Conversation");
const profileModel = require("../../models/profileModel");
//const Joi = require('joi')


const AddConversation = async (req, res) => {
   try {

      const allreadymember = await Conversation.findOne({
         $and: [{ members: [req.body.senderId, req.body.receiverId] }]
      });
      if (allreadymember && req.body.senderId !== "" && req.body.receiverId !== "") {
         res.status(404).json({ success: false, responseMessage: "Allready add your Friends", });
      }
      else {
         const Conversationschema = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
         });

         if (req.body.senderId == "" || req.body.receiverId == "") {
            res.status(301).json({
               success: false,
               responseMessage: "something went wrong",

            });

         } else {

            const savedata = Conversationschema.save();
            console.log("save", savedata);
            res.status(200).json({
               success: true,
               responseMessage: "Successfully add your Friends",
               result: savedata
            });

         }

      }

   } catch (err) {
      res.status(500).json({ success: false, message: "conversation not found" });
      console.log("err", err);
   }
};



// const AddConversation = async (req, res) => {
//    try {
//      const data = req.body;
//      const savedata = await Conversation.create(data);
//      if (savedata) {
//        res.status(200).json({
//          success: true,
//          responseMessage: savedata,
//        });
//      } else {
//        res.status(400).json({
//          success: false,
//          responseMessage: "not  add conversation",
//        });
//      }
//    } catch (err) {
//      res.status(500).json({ success: false,  responseMessage: "conversation not found" });
//      console.log("err", err);
//    }
//  };



//  const AddConversation = async (req, res) => {
//    try {
//      const userSchema = Joi.object({
//        members: Joi.array().items(
//          Joi.object().keys({
//            ssenderId: Joi.string().required(),
//            recverId: Joi.string().required(),
//          })
//        ),
//      });
//      let result = userSchema.validate(req.body);
//      if (result.error) {
//        res.status(400).send(result.error.details[0].message);
//        return;
//      }
//      const user = await User.findOne({
//        members: { $elemMatch: { ssenderId: mongoose.Types.ObjectId(req.body) } },
//      });
//      console.log("user>>>>>", user);
//      const getuser = await User.findByIdAndUpdate(req.user.id, {
//        $push: { members: req.body.members },
//      });
//      res.status(200).json({success: true, responseMessage: "successfullyn add to friend"});
//    } catch (error) {
//      return res.status(500).json({
//        success: false,
//        responseMessage: error.toString(),
//      });
//    }
//  };


//get Conversation
// const getConversation = async (req, res) => {
//    try {
//       const user = await profileModel.findById(req.params.userId)
//       const member = await Promise.all(
//          user.followers.map((friendId) => {
//             return profileModel.findById(friendId);
//          })
//       );
//       let MembersList = [];
//       member.map((friend) => {
//          const { _id, userName, profilePic} = friend;
//          MembersList.push({ _id, userName, profilePic});
//       });
//       // console.log("MembersList", MembersList)
//       res.status(200).json(MembersList);
//    } catch (err) {
//       console.log("err", err)
//       res.status(500).json({ success: false, message: "conversation not found" });

//    }


//  }
const getConversation = async (req, res) => {
   try {
      const conversationschema = await Conversation.find({
         members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversationschema);
   } catch (err) {
      res.status(500).json({ success: false, message: "conversation not found" });

   }


}

// const getConversation = async (req, res) => {
//    try {
//         const id = req.params.userId
//          const conversationschema = await Conversation.find({id}).populate("members.senderId").populate("members.receiverId")
//          console.log("smjndkanjdnjsd", conversationschema)
         
//       res.status(200).json(conversationschema);
//    } catch (err) {
//       console.log("err", err)
//       res.status(500).json({ success: false, message: "conversation not found" });

//    }


// }

const getFind = async (req, res) => {
   try {
      const conversation = await Conversation.findOne({
         members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
   } catch (err) {
      res.status(500).json({ success: false, message: "get conversation member fail" });
   }
}

module.exports = {
   getConversation,
   AddConversation,
   getFind
}




