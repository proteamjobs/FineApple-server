const db = require("../models");

module.exports = async user_id => {
  return await db.heartedItems.findAll({
    where: { user_id: user_id },
    include: [{ model: db.users }, { model: db.products }, { model: db.stores }]
  });
};
