const Comments = require("../../models/chatModels/Comments");


const AddComments = async (req, res) => {
    try {
        const comment = req.body
        const addcomment = await Comments.create(comment)
        if (addcomment) {
            return res.status(200).json({
                success: true,
                message: " successfully comment",
                responseResult: addcomment
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "comment failed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString()
        })
    }

}


const getcomments = async (req, res) => {
    try {
        const getAllComments = await Comments.find().populate("comment.userId")
        if (getAllComments[0]) {
            return res.status(200).json({
                success: true,
                message: "successfull",
                getAllComments
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "failed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString()
        })
    }

}

module.exports = {
    AddComments,
    getcomments

}







