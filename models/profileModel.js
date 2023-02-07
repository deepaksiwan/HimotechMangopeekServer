const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  firstName:{
    type:String,
    required: [true, "Please Enter  firstName"],
    unique:true
  },
  lastName:{
    type:String,
    required: [true, "Please Enter  lastName"],
    unique:true
  },
  email:{
    type:String,
    required: [true, "Please Enter  Email"],
    unique:true
  },
  userName: {
    type: String,
    required: [true, "Please Enter profile UserName"],
    trim: true,
    unique:true
  },
  password:{
    type:String,
    required: [true, "Please Enter  Password"],
  },
  conformPassword:{
    type:String,
    required: [true, "Please Enter  Password"],
  },

  profilePic: {
    type:String,
    required:true,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  },
  //add.......
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  // followers: [],
  // following: [],
  // ...end
  bio: {
    type: String,
    required: [true, "Please Enter Profile  Bio"],
    default: 'My Nfts Collection',
  },

  twitterName:{type:String},
  facebookName:{type:String},
  personalURL:{type:String},

},{ timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);