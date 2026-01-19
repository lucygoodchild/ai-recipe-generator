export const checkUserAuth = async () => {
  try {
    const response = await fetch("/api/v1/users/check-auth", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to check authentication");
    }

    const data = await response.json();
    return { isLoggedIn: true, user: data.data.user };
  } catch (err) {
    console.error(err);
    return { isLoggedIn: false, error: err.message };
  }
};
