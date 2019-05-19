const db = require("../models");

// Check user in database
module.exports = async (user_id, provider) => {
  let getUsers = await db.users.findOne({
    where: { user_id: user_id, provider: provider }
  });

  if (!getUsers) {
    console.log("OKOKOK");
    return false;
  } else {
    console.log("Already!!");
    return true;
  }
};
