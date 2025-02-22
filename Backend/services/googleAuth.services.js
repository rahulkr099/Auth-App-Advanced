const User = require("../models/user.model");
// const refreshGoogleToken = require("../utils/refreshGoogleToken")
const { oauth2Client } = require("../utils/oauth2Client");

exports.checkGoogleAccessToken = async (req, res) => {
  try {
    const accessToken =
      req?.cookies?.googleAccessToken || req?.body?.googleAccessToken;
    console.log("accessToken in checkGoogleAccessToken", accessToken);
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access Token is missing or expired",
      });
    }
    // await authenticateGoogleRequest(User);
    //check user is registered or not
    // let user = await User.findOne({accessToken:accessToken})
    // console.log('google user',user)
    // if(!user){
    //   return res.status(404).json({
    //     success:false,
    //     message: "User not found",
    //   })
    // }
    let userData;
    try {
      const userRes = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );

      if (!userRes.ok) {
        const errorText = await userRes.text();
        throw new Error(`Failed to fetch user info: ${errorText}`);
      }

      userData = await userRes.json();
      console.log("User Data:", userData);
    } catch (error) {
      console.error("Google accessToken is expired", error);
     return res.status(401).json({
        success: false,
        message: "Google accessToken is expired",
      });
    }

    res.status(200).json({
      success: true,
      userData,
      message: "Google accessToken is currently active",
    });
  } catch (error) {
    console.error("Some error in google access token", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while checking google authentication",
    });
  }
};

exports.authenticateGoogleRequest = async (req, res) => {
  try {
    console.log("Trying to authenticate access token.");

    // Retrieve refresh token from cookies or body
    const incomingRefreshToken =
      req?.cookies?.googleRefreshToken || req?.body?.googleRefreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request: Refresh Token is missing",
      });
    }

    // Refresh access token using the provided refresh token
    const newTokens = await refreshGoogleToken(incomingRefreshToken);

    console.log("Access token is refreshed:", newTokens);
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1 days
      httpOnly: true,
    };

    // Return the new access token and optionally update your user model/database
    return res
      .status(200)
      .cookie('googleAccessToken',newTokens.access_token,cookieOptions)
      .cookie('googleRefreshToken',newTokens.refresh_token,cookieOptions)
      .json({
        success: true,
        googleAccessToken: newTokens.access_token,
        expiresIn: newTokens.expiry_date,
      });
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * Refresh Google access token
 */
const refreshGoogleToken = async (refreshToken) => {
  try {
    console.log("Refreshing access token...");
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const { credentials } = await oauth2Client.refreshAccessToken();
    console.log("New credentials received:", credentials);

    return credentials; // Contains new access token and expiration time
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    throw new Error("Failed to refresh access token.");
  }
};
