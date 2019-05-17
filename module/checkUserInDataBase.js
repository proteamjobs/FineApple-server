const db = require("../models");

// Check user in database
module.exports = (user_id, provider) => {
  let responseData = {
    isMember: false
  };
  return db.users
    .findAll({ where: { user_id: user_id, provider: provider } })
    .then(result => {
      if (!result.length) {
        return responseData;
      } else if (result) {
        responseData.isMember = !responseData.isMember;
        responseData["userDB_id"] = result[0].dataValues.id;
        return responseData;
      }
    })
    .catch(err => {
      res.send(err);
      console.log("ERROR :: POST /users/auth :: ", err);
    });
};
