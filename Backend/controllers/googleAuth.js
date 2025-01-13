const User = require("../models/user.model");
const refreshGoogleToken = require("../utils/refreshGoogleToken")

exports.checkGoogleAccessToken = async (req, res) => {
  try {
    const accessToken = await req?.cookies?.googleAccessToken ||
    req?.body?.googleAccessToken ||
    req?.headers?.["authorization"]?.replace("Bearer ", "");

    if (!accessToken) {
      return res.json({
        success: false,
        message: "Access Token is invalid or expired",
      });
    }
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

const authenticateGoogleRequest = async (User) => {
  try {
    // Check token expiration logic (optional, depending on use case)
    const isTokenExpired = false; // Replace with your expiration check logic
    if (isTokenExpired) {
      const newTokens = await refreshGoogleToken(User.refreshToken);

      User.accessToken = newTokens.access_token;
      await User.save();
    }

    // Use the access token for API calls
    oauth2Client.setCredentials({ access_token: User.accessToken });
  } catch (error) {
    console.error("Authentication error:", error.message);
    throw error;
  }
};
