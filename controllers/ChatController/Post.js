const  Post =  require("../../models/chatModels/Post");

const AddPost = async (req, res) => {
   const newPost = new Post(req.body);
   try {
     const savedPost = await newPost.save();
     res.status(200).json(savedPost);
   } catch (err) {
     res.status(500).json({success: false, message:"post add fail"});
   }
}

const putPost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json({success: true, message:"the post has been updated successfully"});
      } else {
        res.status(403).json({success: false, message:"you can update only your post"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      
    }

}

const deletePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }

}

const like = async(req, res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }

}


module.exports = {
  AddPost,
  putPost,
  deletePost,
  like
  

}
