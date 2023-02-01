
const express = require("express")
const router = express.Router()

const {verifyToken}=require('../middleware/auth');

const {AddConversation, getConversation, getFind} = require("../controllers/ChatController/Conversation")
const {AddMessage, getMessage} = require ("../controllers/ChatController/Message")
const {AddPost, putPost, like} = require("../controllers/ChatController/Post")
const {AddComments, getcomments} = require("../controllers/ChatController/Comments")
const {getUser,getFriends, follow } = require("../controllers/ChatController/Users")




/**
 * @swagger
 * /api/v1/chat/AddConversation:
 *   post:
 *     tags:
 *       - Conversation
 *     description: add Conversation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: members
 *         description: members required .
 *         
 *     responses:
 *       200:
 *         description: conversation add successfully.
 *       500:
 *         description: Internal Server Error
 *      
 */

router.post("/AddConversation", AddConversation)


 /**
 * @swagger
 * /api/v1/chat/getConversation:
 *   get:
 *     tags:
 *       - Conversation
 *     description: get Conversation detail by userId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId required.
 *        
 *     responses:
 *       200:
 *         description: conversation successfully get
 *       500:
 *         description: conversation not found
 */

router.get('/getConversation/:userId', getConversation)


/**
 * @swagger
 * /api/v1/chat/getFind:
 *   get:
 *     tags:
 *       - Conversation
 *     description: get Conversation detail by firstUserId and secondUserId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstUserId,secondUserId
 *         description: firstUserId,secondUserId required.
 *        
 *     responses:
 *       200:
 *         description: conversation successfully get
 *       500:
 *         description: get conversation member fail
 */


router.get('/getFind/:firstUserId/:secondUserId', getFind)

/**
 * @swagger
 * /api/v1/chat/AddMessage:
 *   post:
 *     tags:
 *       - Message
 *     description: addmessage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         description: text required.
 *         required: true
 *     responses:
 *       200:
 *         description:add message successfully.
 *       500:
 *         description: add message fail
 *      
 */
router.post("/AddMessage", AddMessage)

/**
 * @swagger
 * /api/v1/chat/getMessage:
 *   get:
 *     tags:
 *       - Message
 *     description: get Message detail by conversationId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: conversationId
 *         description: conversationId required
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: message successfully get
 *       500:
 *         description:get message fail
 */

router.get("/getMessage/:conversationId", getMessage)



// /**
//  * @swagger
//  * /api/v1/chat/AddPost:
//  *   post:
//  *     tags:
//  *       - post
//  *     description: add post
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: userId
//  *         description: userId required.
//  *         in: formData
//  *         required: true
//  *        - name: desc
//  *         description: desc required.
//  *         in: formData
//  *         required: true
//  *         - name: img
//  *         description: img required.
//  *         in: formData
//  *         required: true
//  *         - name: likes
//  *         description: likes required.
//  *         in: formData
//  *         required: true
//  *     responses:
//  *       200:
//  *         description:add post successfully.
//  *       500:
//  *         description: post add fail
//  *      
//  */


router.post("/Comments",verifyToken, AddComments)
router.get("/getcomments", getcomments)
  

router.post("/AddPost", AddPost)
router.put("/putPost/:id", putPost)
router.put("/like/:id", like)


router.get("/getUser", getUser)
router.put("/follow/:id", follow)
router.get("/getFriends/:userId", getFriends)



module.exports=router
