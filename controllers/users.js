const db = require("../models");

module.exports = {
  auth: {
    post: (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;
      let responseData = {
        isMember: false
      };
      db.users
        .findAll({ where: { user_id: user_id, provider: provider } })
        .then(result => {
          if (!result.length) {
            res.status(201).json(responseData);
          } else if (result) {
            responseData.isMember = !responseData.isMember;
            res.status(201).json(responseData);
          }
        })
        .catch(err => {
          res.send(err);
          console.log("ERROR :: POST /users/auth :: ", err);
        });
    }
  },
  signup: {
    post: (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;

      db.users
        .create({ user_id: user_id, provider: provider })
        .then(result => {
          res.send("Done");
        })
        .catch(err => {
          res.send(err);
          console.log("ERROR :: POST /users/signup :: ", err);
        });
    }
  },
  token: {
    post: (req, res) => {
      res.send(req.body);
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
