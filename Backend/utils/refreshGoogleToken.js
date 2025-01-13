const refreshGoogleToken = async (refreshToken) => {
    try {
      oauth2Client.setCredentials({ refresh_token: refreshToken });
      const { credentials } = await oauth2Client.refreshAccessToken();
      return credentials; // Contains new accessToken and expiration time
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
      throw error;
    }
  };
  