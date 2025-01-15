const refreshGoogleToken = async () => {
    const BASE_URL = "http://localhost:4000/api/v1";
  
    try {
      const response = await fetch(`${BASE_URL}/google/auth/refresh`, {
        method: "GET",
        credentials: "include",
      });
  
      const responseClone = response.clone();
      const clonedData = await responseClone.json();
      console.log("Response from frontend refreshToken.js: ", clonedData);
      console.log("refreshToken's message:", clonedData.message);
  
      if (!response.ok) {
        console.error("Failed to get Refresh Token:", response);
        throw new Error("Token Refreshing Failed");
      }
      if (response.ok) {
        const { googleAccessToken } = await response.json();
        if (googleAccessToken) {
          localStorage.setItem("googleAccessToken", googleAccessToken); // Store token only if response is successful
          return googleAccessToken;
        } else {
          console.error("No access token in response payload.");
          return null;
        }
      } else {
        console.error(`Token Refreshing Failed: ${response.status} ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error("Error during refreshing token:", error);
      return null; // Return null if refresh fails
    }
  };
  
  export default refreshGoogleToken;
  