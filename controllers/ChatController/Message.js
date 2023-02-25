const  Message =  require("../../models/chatModels/Message");

//Add Conversation
const AddMessage = async (req, res) => {
   const newMessage = new Message({
      conversationId: req.body.conversationId,
      sender: req.body.sender,
      text: req.body.text
   })
   try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
   } catch (err) {
      res.status(500).json({success:false,message:"add message fail"});
      console.log(err)
   }
}

//get Message
// const getMessage = async(req, res) => {
//    try {
//       const messages = await Message.find({
//          conversationId: req.params.conversationId,
//       });
//       res.status(200).json(messages);
//    } catch (err) {
//       res.status(500).json({success:false,message:"get message fail"});
//       console.log(err);
//    }

// }



const getMessage = async(req, res) => {
   try {
      const messages = await Message.find({
         conversationId: req.query.conversationId,
      });
      res.status(200).json({success: true, responseMessage: messages});
   } catch (err) {
      res.status(500).json({success:false,message:"get message fail"});
      console.log(err);
   }

}

module.exports = {
   getMessage,
   AddMessage
}




