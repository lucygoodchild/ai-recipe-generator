const dotenv = require("dotenv");
dotenv.config({ path: "./../.env.local" });

//TODO - remove hardcoded values

export const fetchUsersPersonalDetails = async (userId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/users/66cf0e71a7a356500877b219`,
      { credentials: "include" }
    );
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
