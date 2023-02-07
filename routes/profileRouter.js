const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  viewProfile,
  getProfileByUserName,
  editProfile,
  
} = require("../controllers/profileController");
const { verifyToken } = require("../middleware/auth");

/**
 * @swagger
 * /api/v1/Profile/signup:
 *   post:
 *     tags:
 *       - Profiles
 *     description: Signup
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: firstName required.
 *         in: formData
 *         required: true
 *       - name: lastName
 *         description: lastName required.
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: userName
 *         description: userName required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *       - name: conformPassword
 *         description: password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signup.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/v1/profile/login:
 *   post:
 *     tags:
 *       - Profiles
 *     description: login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName/email
 *         description: userName/Email required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: Password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully Login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */


router.post("/login", login);





/**
 * @swagger
 * /api/v1/Profile/viewProfile:
 *   get:
 *     tags:
 *       - Profiles
 *     description: view profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Profile data succesfully  fetched
 *       404:
 *         description: The profile is not found
 *       501:
 *         description: Something went wrong!
 */
router.get("/viewProfile", verifyToken, viewProfile);

/**
 * @swagger
 * /api/v1/Profile/getProfileByUserName:
 *   get:
 *     tags:
 *       - Profiles
 *     description: get profile detail by userName
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: get profile detail by userName.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Profile data succesfully  fetched
 *       404:
 *         description: The profile is not found
 *       501:
 *         description: Something went wrong!
 */
router.get("/getProfileByUserName",getProfileByUserName);


/**
 * @swagger
 * /api/v1/profile/editProfile:
 *   put:
 *     tags:
 *       - Profiles
 *     description: editProfile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: editProfile
 *         description: profile edit.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/editProfile'
 *     responses:
 *       200:
 *         description: Profile Edit Successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.put("/editProfile", verifyToken, editProfile);

module.exports = router;
