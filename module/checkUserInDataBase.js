const db = require("../models");

// Check user in database
module.exports = async (user_id, provider, token) => {
  let checkResult = { isMember: false };
  let getUsers = await db.users.findOne({
    where: { user_id: user_id, provider: provider }
  });
  // console.log("@@@@@@@@@@@@@@@@@@", token);
  if (!getUsers) {
    // console.log("OKOKOK");
    return checkResult;
  } else if (token !== undefined) {
    // console.log("Already!!");
    checkResult.isMember = true;
    checkResult["userDB_id"] = getUsers.dataValues.id;
    checkResult.token = token;
    return checkResult;
  } else {
    checkResult.isMember = true;
    checkResult["userDB_id"] = getUsers.dataValues.id;
    return checkResult;
  }
};
