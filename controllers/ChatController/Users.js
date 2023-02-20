const  profileModel =  require("../../models/profileModel");


//get a user
const getUser = async(req, res) => {
   const userId = req.query.userId;
   const username = req.query.username;
   
   try {
     const user = userId
       ? await profileModel.findById(userId)
       : await profileModel.findOne({ username: username });
     const { password, updatedAt, ...other } = user._doc;
     res.status(200).json(other);
   } catch (err) {
     res.status(500).json(err);
   }

}

//get friends
// const getFriends = async(req, res) => {
//    try {
//       const user = await profileModel.findById(req.params.userId);
//       console.log("user", user)
//       const friends = await Promise.all(
//         user.followers.map((friendId) => {
//           return profileModel.findById(friendId);
//         })
//       );
//       let friendList = [];
//       friends.map((friend) => {
//         const { _id, userName, profilePic } = friend;
//         friendList.push({ _id, userName, profilePic });
//       });
//       res.status(200).json(friendList)
//     } catch (err) {
//       res.status(500).json(err);
//     }

// }



const getFriends = async(req, res) => {
  try {
     const user = await profileModel.findById(req.params.userId);
    // console.log("user", user)
     const friends = await Promise.all(
       user.followers.map((friendId) => {
         return profileModel.findById(friendId);
       })
     );
     let friendList = [];
     friends.map((friend) => {
       const { _id, userName, profilePic } = friend;
       friendList.push({ _id, userName, profilePic });
     });
     res.status(200).json(friendList)
   } catch (err) {
     res.status(500).json(err);
   }

}

//follower put api
const follow = async(req, res) => {
  if (req.body.userId !== req.query.followerId) {
    try {
      const user = await profileModel.findById(req.query.followerId);
      const currentUser = await profileModel.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        console.log(user)
        await currentUser.updateOne({ $push: { followings: req.query.followerId } });
        
        
        res.status(200).json( {success: true,message: " successfully follow", responseResult: currentUser});
      } else {
        res.status(201).json({success: false,message: "you allready follow this user",});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({success: false, message:"you cant follow yourself"});
  }
}


//Unfollow put api
const unFollow = async(req, res) => {
  const followerId = req.query.followerId;
  const  userId  = req.body.userId;

  if(userId === followerId)
  {
    res.status(403).json({success: false, message:"Action Forbidden"})
  }
  else{
    try {
      const unFollowUser = await profileModel.findById(followerId)
      const unFollowingUser = await profileModel.findById(userId)
      if (unFollowUser.followers.includes(userId))
      {
        await unFollowUser.updateOne({$pull : {followers: userId}})
        await unFollowingUser.updateOne({$pull : {followings: followerId}})
        res.status(200).json( {success: true,message: " Unfollowed Successfully!"})
      }
      else{
        res.status(403).json( {success: false, message:"You are not following this User"})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = {
   getUser,
   getFriends,
   follow,
   unFollow
   
}




