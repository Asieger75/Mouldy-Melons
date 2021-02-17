// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the movies
  app.get("/api/movies", function(req, res) {
    db.Movies.findAll({
      order: [
        ["title", "ASC"],
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // GET route for getting movies by category
  app.get("/api/movies/category/:category", function(req, res) {
    db.Movies.findAll({
      where: {
        categories: req.params.category.toLowerCase(),
      },
      order: [
        ["title", "ASC"]
      ],
    }).then(function(result) {
      res.json(result);
    });
  });

  // POST route for saving a new movie
  app.post("/api/movies/", function(req, res) {
    db.Movies.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  
  // Get route for retrieving a single movie
  app.get("/api/movies/:id", function(req, res) {
    db.Movies.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Reviews]
    }).then(function(result) {
      res.json(result);
    });
  });
};