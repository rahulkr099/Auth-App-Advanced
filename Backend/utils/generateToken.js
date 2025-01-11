require('dotenv').config();
const jwt = require("jsonwebtoken");

// Modularized function for generating JWT
exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
exports.generateRefreshToken = (payload) => {
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    })
}
