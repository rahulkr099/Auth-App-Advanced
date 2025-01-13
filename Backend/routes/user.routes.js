//Require express.Router() 
const express = require('express');
const router = express.Router();

//Require Models, Controllers and Middlewares as per need
const { login, signup, logout, refreshAccessToken } = require("../controllers/user.controller");
const {signupSchema, loginSchema} = require("../validations/user.validation");
const {validateRequest} = require("../middlewares/validation.middleware");
const { auth } = require('../middlewares/auth.middleware');
const {resetPasswordToken, resetPassword} = require("../controllers/resetPassword.controller");
const { authStatus } = require('../controllers/authStatus.controller');
const {googleLogin} = require("../controllers/googleLogin.controller");
const { checkGoogleAccessToken } = require('../controllers/googleAuth');
// **********************************************************
//  Authentication routes
// **********************************************************

//create Routes using HTTP methods
router.post("/signup",validateRequest(signupSchema),signup);
router.post("/login",validateRequest(loginSchema),login);
//Auth Test
router.get("/test",auth,(req,res)=>{
    res.json({
        success: true,
        message: "Test Successful"
    });
});
router.post("/logout",logout);
router.post("/auth/status",authStatus);

// **************************************************************
// Forgot Password routes
// **************************************************************
// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)
router.post("/refresh-token",refreshAccessToken)
router.get('/google/auth',googleLogin);
router.get('/google/auth/status',checkGoogleAccessToken);

module.exports = router;
