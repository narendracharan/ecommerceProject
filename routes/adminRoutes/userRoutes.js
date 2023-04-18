const express = require("express");
const router = express.Router();
const user = require("../../controllers/adminPanel/userControllers");
const { uploads } = require("../../middleware/imageStorage");
const { signupValidation } = require("../../validation/userValidation");

router.post("/signup", signupValidation, user.userSignup);
router.post("/login", user.userLogin);
router.post("/sendMail", user.sendUserResetPassword);
router.post("/reset-password/:id/:token", user.resetPassword);
router.post("/createUser",user.createUser)
router.get("/userList",user.userList)
router.get("/details/:id",user.userDetails)
router.post("/verifyOtp",user.OtpVerify)
router.post("/editProfile/:id",uploads.single("profile_Pic"),user.editProfile)
router.post("/checkStatus/:id",user.checkStatus)
module.exports = router;