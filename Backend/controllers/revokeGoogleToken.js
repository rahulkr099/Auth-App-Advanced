const User = require('../models/user.model')

const revokeGoogleToken = async (accessToken) => {
    try {
      const res = await fetch(
        `https://oauth2.googleapis.com/revoke?token=${accessToken}`,
        { method: 'POST' }
      );
  
      if (!res.ok) {
        throw new Error(`Failed to revoke token: ${res.statusText}`);
      }
      console.log('Token revoked successfully');
    } catch (error) {
      console.error('Error revoking token:', error.message);
    }
  };
  
  // Revoke on logout
  await revokeGoogleToken(User.accessToken);
  User.accessToken = null;
  User.refreshToken = null;
  await User.save();
  