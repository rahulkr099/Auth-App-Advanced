const  { oauth2Client } = require("./oauth2Client");
exports.refreshGoogleToken = async (refreshToken) => {
    try {
      console.log('Trying to check the value of refresh token in refreshGoogleToken')
      oauth2Client.setCredentials({ refresh_token: refreshToken });
      const { credentials } = await oauth2Client.refreshAccessToken();
      console.log('credentials of new refreshAccessToken',credentials)
      return credentials; // Contains new accessToken and expiration time
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
      throw error;
    }
  };
  