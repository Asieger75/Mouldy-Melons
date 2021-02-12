const db = require("../models");

module.exports = function(app) {
  app.get("/api/user", function(req, res) {
    db.User.findAll({
      include: [db.Reviews]
    }).then(function() {
      res.json(resultUser);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Reviews]
    }).then(function(resultUser) {
      res.json(resultUser);
    });
  });
};
