// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the movies
  app.get("/api/movies", function(req, res) {
    let query = {};
    db.Movies.findAll({
      where: query,
      include: [db.Reviews]
    }).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

  // Get route for retrieving a single movie
  app.get("/api/movies/:id", function(req, res) {
    db.Reviews.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Reviews]
    }).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

  // POST route for saving a new movie
  app.post("/api/movies", function(req, res) {
    db.Movies.create(req.body).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

  // DELETE route for deleting movies
  app.delete("/api/movies/:id", function(req, res) {
    db.Movies.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(resultReviews) {
      res.json(resultReviews);
    });
  });

};