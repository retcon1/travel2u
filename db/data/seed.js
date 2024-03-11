import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

import testUsers from "./test-data/users.js";

// Needed to ensure all passwords are hashed, insertMany skips the mongoose middleware
const hashPasswords = async (usersData) => {
  const hashedUsersData = await Promise.all(
    usersData.map(async (userData) => {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      return { ...userData, password: hashedPassword };
    })
  );
  return hashedUsersData;
};

export const seedDB = async () => {
  await User.deleteMany({});
  const hashedUsersData = await hashPasswords(testUsers);
  await User.insertMany(hashedUsersData);
};
