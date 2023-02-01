
const Conversation = require("../../models/chatModels/Conversation");

//Add Conversation
const AddConversation = (req, res) => {
   const Conversationschema = new Conversation({
      members:[req.body.senderId,req.body.receiverId]
      
   })
   Conversationschema.save()
      .then(result => {
         res.status(200).json({
            success: true,
            message: "successfull",
            result: result,

         })
      })
      .catch(err => {
         res.status(500).json({
            success: false,
            message: "failed",
            error: err,

         })
      })

}

//get Conversation
const getConversation = async (req, res) => {
   try {
      const conversationschema = await Conversation.find({
         members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversationschema);
   } catch (err) {
      res.status(500).json({success:false,message:"conversation not found"});
      
   }


}

const getFind = async (req, res) => {
   try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json({success:false,message:"get conversation member fail"});
    }
}

module.exports = {
   getConversation,
   AddConversation,
   getFind
}




