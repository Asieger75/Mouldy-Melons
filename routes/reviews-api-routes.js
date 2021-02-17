
// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the reviews
  app.get("/api/reviews/", function(req, res) {
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

  // POST route for saving a new review
  app.post("/api/reviews/", function(req, res) {
    db.Reviews.create(req.body).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });


};
