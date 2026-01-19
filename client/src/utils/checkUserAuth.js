export const checkUserAuth = async () => {
  try {
    const response = await fetch("/api/v1/users/check-auth", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const userId = data.data?.user?._id || null;

      if (userId) {
        return {
          userId: userId,
          isAuthenticated: true,
          user: data.data.user,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Failed to check auth:", error);
    return null;
  }
};
