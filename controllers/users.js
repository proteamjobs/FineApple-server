const db = require("../models");
const checkUserInDataBase = require("../module/checkUserInDataBase");

module.exports = {
  auth: {
    post: (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;

      checkUserInDataBase(user_id, provider).then(data => {
        res.status(201).json(data);
      });
    }
  },
  signup: {
    post: async (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;
      let returnData = { response: "", isDone: false };

      let checkMember = await checkUserInDataBase(user_id, provider);

      if (!checkMember.isMember) {
        db.users
          .create({ user_id: user_id, provider: provider })
          .then(() => {
            returnData.response = "Status Code 201, Response OK!";
            returnData.isDone = true;
            res.status(201).json(returnData);
          })
          .catch(err => {
            res.send(err);
            console.log("ERROR :: POST /users/signup :: ", err);
          });
      } else {
        returnData.response = "Status Code 201, Response Already User!";
        res.status(201).json(returnData);
      }
    }
  },
  delete: {
    delete: async (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;

      let isMember = await checkUserInDataBase(user_id, provider);

      if (isMember) {
        db.users
          .destroy({ where: { user_id: user_id, provider: provider } })
          .then(() => {
            res.status(201).send("Status Code 201, Response OK!");
          })
          .catch(err => {
            res.send(err);
            console.log("ERROR :: DELETE /users/delete :: ", err);
          });
      } else {
        res.status(201).send("Status Code 201, Response No Data!");
      }
    }
  },
  deletebyid: {
    delete: (req, res) => {
      const _id = req.body._id;

      db.users
        .destroy({ where: { id: _id } })
        .then(() => {
          res.status(201).send("Status Code 201, Response OK!");
        })
        .catch(err => {
          res.send(err);
          console.log("ERROR :: DELETE /users/deletebyid :: ", err);
        });
    }
  }
};
