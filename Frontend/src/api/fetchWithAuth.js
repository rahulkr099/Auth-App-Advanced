import refreshToken from "./refreshToken";

const fetchWithAuth = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  // console.log("accesstoken in localStorage: ",accessToken)
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {  ...options,  headers,
      credentials: "include",});

    const responseClone = response.clone();
    const clonedData = await responseClone.json();
    console.log("Response in fetchwithauth.js", clonedData, response.status);
    console.log("message:", clonedData.message);

    if (response.status === 401 && !options._retry) {
      console.log("Access token expired. Attempting to refresh token...");
      
      // Token expired, refresh it
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        console.log(
          "Token refreshed successfully. Retrying original request..."
        );
        return fetchWithAuth(url, { ...options, _retry: true }); // Retry original request
      }
    }

    return response;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export default fetchWithAuth;
