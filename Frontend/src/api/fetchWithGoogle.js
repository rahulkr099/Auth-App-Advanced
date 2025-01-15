import refreshGoogleToken from "./refreshGoogleToken";

const fetchWithGoogle = async (url, options = {}) => {
  const googleAccessToken = localStorage.getItem("googleAccessToken");
  console.log("googleAccesstoken in localStorage: ",googleAccessToken)
  const headers = {
    'Content-Type': 'application/json',
    ...(googleAccessToken && { Authorization: `Bearer ${googleAccessToken}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {  ...options,  headers,
      credentials: "include",});

    const responseClone = response.clone();
    const clonedData = await responseClone.json();
    console.log("Response in fetchwithGoogle.js", clonedData, response.status);
    console.log("message:", clonedData.message);

    if (response.status === 401 && !options._retry) {
      console.log("Access token expired. Attempting to refresh token...");
      
      // Token expired, refresh it
      const newGoogleAccessToken = await refreshGoogleToken();
      if (newGoogleAccessToken) {
        console.log(
          "Token refreshed successfully. Retrying original request..."
        );
        return fetchWithGoogle(url, { ...options, _retry: true }); // Retry original request
      }
    }

    return response;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export default fetchWithGoogle;
