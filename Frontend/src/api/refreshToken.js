const refreshToken = async () => {
  const BASE_URL = "http://localhost:4000/api/v1";

  try {
    const response = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const responseClone = response.clone();
    const clonedData = await responseClone.json();
    console.log("response of frontend refreshToken.js: ", clonedData);
    console.log("message:", clonedData.message);

    if (!response.ok) {
      console.error("Failed to refresh token:", response);
      throw new Error("Token refresh failed");
    }
    if (response.ok) {
      const { accessToken } = await response.json();
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken); // Store token only if response is successful
        return accessToken;
      } else {
        console.error("No access token in response payload.");
        return null;
      }
    } else {
      console.error(`Token refresh failed: ${response.status} ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null; // Return null if refresh fails
  }
};

export default refreshToken;
