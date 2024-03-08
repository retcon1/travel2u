import User from "../../models/user.model.js";

import testUsers from "./test-data/users.js";

export const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(testUsers);
};
