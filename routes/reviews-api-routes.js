
// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the reviews
  app.get("/api/reviews", function(req, res) {
    let query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    
    db.Reviews.findAll({
      where: query,
      include: [db.User]
    }).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

  // Get route for retrieving a single review
  app.get("/api/reviews/:id", function(req, res) {
    db.Reviews.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

  // POST route for saving a new review
  app.post("/api/reviews", function(req, res) {
    db.Reviews.create(req.body).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

  // DELETE route for deleting reviews
  app.delete("/api/reviews/:id", function(req, res) {
    db.Reviews.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

  // PUT route for updating reviews
  app.put("/api/reviews", function(req, res) {
    db.Reviews.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });
};
