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
    post: (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;

      checkUserInDataBase(user_id, provider).then(data => {
        let isMember = data.isMember;
        if (!isMember) {
          db.users
            .create({ user_id: user_id, provider: provider })
            .then(() => {
              res.send("Done");
            })
            .catch(err => {
              res.send(err);
              console.log("ERROR :: POST /users/signup :: ", err);
            });
        } else {
          res.send("Already user");
        }
      });
    }
  },
  delete: {
    delete: (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;

      db.users
        .destroy({ where: { user_id: user_id, provider: provider } })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.send(err);
          console.log("ERROR :: DELETE /users/delete :: ", err);
        });
    }
  },
  deletebyid: {
    delete: (req, res) => {
      const _id = req.body._id;

      db.users
        .destroy({ where: { id: _id } })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.send(err);
          console.log("ERROR :: DELETE /users/deletebyid :: ", err);
        });
    }
  }
};
