export const fetchUsersPersonalDetails = async (userId) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user's details: Status ${response.status}`
      );
    }
    let personalData = await response.json();
    return personalData.data;
  } catch (err) {
    console.error(err);
  }
};
