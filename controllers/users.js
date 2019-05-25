const db = require("../models");
const checkUserInDataBase = require("../module/checkUserInDataBase");
const makeJwt = require("../module/makeJwt");
const secret = require("../config/config.json").jwtSecret;
const jwt = require("jsonwebtoken");
// const secret = "SeCrEtKeYfOrHaShInG";

module.exports = {
  // auth: {
  //   post: (req, res) => {
  //     const user_id = req.body.user_id;
  //     const provider = req.body.provider;

  //     checkUserInDataBase(user_id, provider).then(data => {
  //       res.status(201).json(data);
  //     });
  //   }
  // },
  check: {
    get: (req, res) => {
      const token = req.headers["x-access-token"];
      console.log(req.query.provider);
      console.log(token);
      // token does not exist
      if (!token) {
        return res.status(403).json({
          isLogged: false,
          message: "not logged in"
        });
      }

      // create a promise that decodes the token
      const p = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        });
      });

      // if token is valid, it will respond with its info
      const respond = token => {
        console.log(token._id);
        checkUserInDataBase(token._id, req.query.provider, undefined).then(
          data => {
            if (data.isMember) {
              res.json({
                isLogged: true
              });
            } else {
              res.json({
                isLogged: false
              });
            }
          }
        );
      };

      // if it has failed to verify, it will return an error message
      const onError = error => {
        res.status(403).json({
          isLogged: false,
          message: error.message
        });
      };

      // process the promise
      p.then(respond).catch(onError);
    }
  },
  auth: {
    //jwt 도입 이후 코드
    post: (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;
      // console.log(req.body);

      makeJwt(user_id).then(token => {
        console.log(token);
        checkUserInDataBase(user_id, provider, token).then(data =>
          res.status(201).json(data)
        );
      });
    }
  },
  signup: {
    post: async (req, res) => {
      const user_id = req.body.user_id;
      const provider = req.body.provider;
      const email = req.body.email;

      let returnData = { response: "", isDone: false, userDB_id: 0 };
      let checkMember = await checkUserInDataBase(user_id, provider);

      if (!checkMember.isMember) {
        db.users
          .create({ user_id: user_id, provider: provider, email: email })
          .then(data => {
            // console.log(data);
            returnData.response = "Status Code 201, Response OK!";
            returnData.isDone = true;
            returnData.userDB_id = data.dataValues.id;
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
