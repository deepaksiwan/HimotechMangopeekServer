const ProfileModel = require('../models/profileModel')
const Joi = require("joi");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const responseCodes = require("../utils/responseCodes")
const responseMessage = require("../utils/responseMessage");
const { default: mongoose } = require('mongoose');
const common = require("../utils/common")
require("dotenv").config();

const signup = async (req, res, next) => {
    const validationSchema = {
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        conformPassword: Joi.string().required(),

    }
    console.log("validationSchema", validationSchema)
    try {
        const validatedBody = await Joi.validate(req.body, validationSchema);
        const {firstName, userName,email,lastName, password, conformPassword } = validatedBody
         console.log(validatedBody);
        const user = await ProfileModel.findOne({ $or: [{ userName: userName },{ email: email }] })
        
        console.log("user", user)
        if (user) {
            return res.json({ responseCode: responseCodes.ALREADY_EXIST, responseMessage: responseMessage.USER_ALREADY })
        } else {
            const salt = await bcryptjs.genSalt(10)
            const userSave = await ProfileModel({
                lastName: lastName,
                firstName: firstName,
                userName: userName,
                email: email,
                password: bcryptjs.hashSync(password, salt),
                conformPassword: bcryptjs.hashSync(password, salt),
                //walletId: new mongoose.Types.ObjectId()

            });
            if (password !== conformPassword) {
                return res.send({ responseCode: responseCodes.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.PASSWORD_NOT_MATCH })
            }
            await userSave.save();
            if (userSave) {
                const token = jwt.sign({ userId: userSave._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
                return res.send({ responseCode: responseCodes.SUCCESS, responseMessage: responseMessage.SIGN_UP, token: token, responseResult: userSave })

            } else  if(error){
                console.log("error", error)
                return res.send({ responseCode: responseCodes.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: [] })
            }
        }

    }
    catch (error) {
       
        return res.send({ responseCode: responseCodes.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error })
    }
}


const login = async (req, res) => {
    const validationSchema = {
        userName: Joi.string(),
        email: Joi.string(),
        password: Joi.string().required()

    }
    try {
        const validatedBody = await Joi.validate(req.body, validationSchema);
        const {userName, email, password } = validatedBody
        const user = await ProfileModel.findOne({$or:[{userName:userName},{email:email}]});
        console.log("user", user)


        if (user) {
            const isMatch = await bcryptjs.compareSync(password, user.password)
            if (isMatch == true) {
                const token = jwt.sign({ userId: user._id },
                   
                    process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
                    //console.log("token", token)
                return res.send({ responseCode: responseCodes.SUCCESS, responseMessage: responseMessage.LOG_IN, token: token, responseResult: user })
            }
            else {
                return res.send({ responseCode: responseCodes.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.PASSWORD_INVALID, responseResult: [] })
            }
        }
        else {
            return res.send({ responseCode: responseCodes.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.UNABLE_LOGIN, responseResult: user })
        }

    }
    catch (error) {
        return res.send({ responseCode: responseCodes.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
    }

}










const viewProfile = async (req, res) => {
    try {
        const user = await ProfileModel.findOne({ _id: req.userId }).select("-password -__v")
        if (!user) {
            res.status(404).json({ success: false, message: "Profile not found" })
        } else {
            res.status(200).json({ success: true, message: "succesfully data fetched", data: user })
        }
    } catch (error) {
        res.status(501).json({ success: false, message: err })
    }
}

const getProfileByUserName = async (req, res) => {
    try {
        const user = await ProfileModel.findOne({ userName: req.query.userName }).select("-password -__v")
        // console.log("user", user);
        if (!user) {
            res.status(404).json({ success: false, message: "Profile not found" })
        } else {
            res.status(200).json({ success: true, message: "succesfully data fetched", data: user })
        }
    } catch (error) {
        res.status(501).json({ success: false, message: err })
    }
}


const editProfile = async (req, res) => {
    const validationSchema = {
        firstName: Joi.string().allow().required(),
        lastName: Joi.string().allow().required(),
        email: Joi.string().email().required(),
        userName: Joi.string().allow().required(),
        bio: Joi.string().allow("").optional(),
        // twitterName: Joi.string().allow("").optional(),
        // facebookName: Joi.string().allow("").optional(),
        // personalURL: Joi.string().allow("").optional()
    };
    try {
        const validatedBody = await Joi.validate(req.body, validationSchema)
        const user = await ProfileModel.findOne({ _id: req.userId })

        if (!user) {
            res.status(404).json({ success: false, message: "Profile not found" })
        } else {
            const {firstName,lastName, email, userName, bio} = validatedBody;
            if (!bio && !email && !firstName&&  !lastName && !userName ) {
                res.status(501).json({ success: false, message: "No any updated data field" });
            } else {
                let updateData;
                if (email && firstName && lastName && userName && bio) {
                    let checkEmail = await ProfileModel.findOne({ $and: [{ email: email, _id: { $ne: user._id } }] });
                
                    let checkUserName = await ProfileModel.findOne({ $and: [{ userName: userName, _id: { $ne: user._id } }] });
                    // console.log(checkUserName)
                    if (checkEmail) {
    
                        res.status(201).json({ success: false, message: "user with email already exists" });
                    }
                    else if (checkUserName) {
                        res.status(202).json({ success: false, message: "user with username already exists" });
                    }
                    else {

                        updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, validatedBody, { new: true }).select("-password");

                        res.status(200).json({ success: true, responseCodes: responseCodes.SUCCESS, message: "updated successfully", data: updateData })

                    }
                } else {
                    if (firstName) {
                        updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { firstName: firstName } }, { new: true }).select("-password")
                    }
                    if (lastName) {
                        updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { lastName: lastName } }, { new: true }).select("-password")
                    }
                    if (email) {
                        updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { email: email } }, { new: true }).select("-password")
                    }
                    if (userName) {
                        updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { userName: userName } }, { new: true }).select("-password")
                    }
                    if (bio) {
                        updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { bio: bio } }, { new: true }).select("-password")
                    }
                    // if (twitterName) {
                    //     updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { twitterName: twitterName } }, { new: true }).select("-password")
                    // }
                    // if (facebookName) {
                    //     updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { facebookName: facebookName } }, { new: true }).select("-password")
                    // } if (personalURL) {
                    //     updateData = await ProfileModel.findByIdAndUpdate({ _id: user._id }, { $set: { personalURL: personalURL } }, { new: true }).select("-password")
                    // }
                    if (updateData) {
                        res.status(200).json({ success: true, message: "updated successfully", data: updateData })
                    } else {
                        res.status(501).json({ success: false, responseCode: responseCodes.SOMETHING_WRONG, message: "something went wrong" })
                    }
                }


            }

        }

    } catch (err) {
        res.status(501).json({ success: false, message: err })
        console.log(err)
    }
}



module.exports = {
    login,
    signup,
    viewProfile,
    getProfileByUserName,
    editProfile,

}