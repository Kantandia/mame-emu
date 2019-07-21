var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("home");
  });

  app.get("/arcade", function(req, res) {
    res.render("arcade");
  });

  // Load index page
  app.get("/drinksPage", function(req, res) {
    db.Drink.findAll({}).then(function(dbDrinks) {
      res.render("index", {
        msg: "Welcome!",
        drinks: dbDrinks
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/drink/:id", function(req, res) {
    db.Drink.findOne({ where: { id: req.params.id } }).then(function(dbDrink) {
      res.render("drink", {
        drink: dbDrinks
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
