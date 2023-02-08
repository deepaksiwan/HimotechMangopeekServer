
const Conversation = require("../../models/chatModels/Conversation");




const AddConversation = async (req, res) => {
   try {
      const allreadymember = await Conversation.findOne({
         members: [req.body.senderId, req.body.receiverId],
      });
     
      if (allreadymember && req.body.senderId !== "" && req.body.receiverId !=="") {
         res.status(404).json({ success: false, responseMessage: "Allready add your Friends", });
      }
      else  {
         const Conversationschema = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
         });

        if(req.body.senderId !== "" && req.body.receiverId !== ""){
         const savedata = Conversationschema.save();
         console.log("save", savedata);
         res.status(200).json({
            success: true,
            responseMessage: "Successfully add your Friends",
            result:savedata
         });
        }else{
         res.status(301).json({
            success: false,
            responseMessage: "something went wrong",
            
         });

        }
         
      }
      
   } catch (err) {
      res.status(500).json({ success: false, message: "conversation not found" });
      console.log("err", err);
   }
};


//get Conversation
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




