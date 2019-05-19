const db = require("../models");

// Check user in database
module.exports = async (user_id, provider) => {
  let checkResult = { isMember: false };
  let getUsers = await db.users.findOne({
    where: { user_id: user_id, provider: provider }
  });

  if (!getUsers) {
    console.log("OKOKOK");
    return checkResult;
  } else {
    console.log("Already!!");
    checkResult.isMember = true;
    checkResult["userDB_id"] = getUsers.dataValues.id;
    return checkResult;
  }
};
