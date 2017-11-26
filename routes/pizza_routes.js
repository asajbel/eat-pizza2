var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Pizza.findAll({}).then(function(data) {
      res.render("index", { pizza: data });
    });
  });

  app.post("/api/pizza", function(req, res) {
    db.Pizza.create(req.body).then(function(result) {
      res.json({ id: result.insertId });
    }).catch(function(error) {
      if (error.name === "SequelizeValidationError") {
        res.statusMessage = error.errors[0].message;
    		res.sendStatus(400).end();
      }
    });
  });

  app.put("/api/pizza/:id", function(req, res) {
    db.Pizza.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    }).catch(function(error) {
      if (error.name === "SequelizeValidationError") {
        res.statusMessage = error.errors[0].message;
    		res.sendStatus(400).end();
      }
    });
  });
}