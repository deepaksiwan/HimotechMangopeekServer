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
const getFriends = async(req, res) => {
   try {
      const user = await profileModel.findById(req.params.userId);
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


const follow = async(req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await profileModel.findById(req.params.id);
      const currentUser = await profileModel.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
}

module.exports = {
   getUser,
   getFriends,
   follow
   
}




