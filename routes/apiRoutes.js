var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/drinks", function(req, res) {
    db.Drink.findAll({}).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

  // Create a new example
  app.post("/api/drinks", function(req, res) {
    console.log(req.body);
    db.Drink.create(req.body).then(function(dbDrink) {
      res.json(dbDrink);
    });
  });

  // Delete an example by id
  app.delete("/api/drinks/:id", function(req, res) {
    db.Drink.destroy({ where: { id: req.params.id } }).then(function(dbDrink) {
      res.json(dbDrink);
    });
  });
};
