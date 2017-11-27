var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Pizza.findAll({
      include: ['Customer'],
      order: [
        ['updatedAt']
      ]
    }).then(function(data) {
      res.render("index", { pizza: data });
    });
  });

  app.get("/api/pizza", function(req, res) {
    db.Pizza.findAll({
      include: ['Customer'],
      order: [
        ['updatedAt']
      ]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/customer", function(req, res) {
    db.Customer.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/pizza", function(req, res) {
    db.Pizza.create(req.body).then(function(result) {
      res.json(result);
    }).catch(function(error) {
      if (error.name === "SequelizeValidationError") {
        res.statusMessage = error.errors[0].message;
        res.sendStatus(400).end();
      }
    });
  });

  app.post("/api/customer", function(req, res) {
    db.Customer.findOrCreate({
      where: {
        name: req.body.name
      },
      default: {
      }
    }).then(function(result) {
    	console.log(result);
      console.log(result[0]);
      res.json(result[0]);
    }).catch(function(error) {
      if (error.name === "SequelizeValidationError") {
        res.statusMessage = error.errors[0].message;
        res.sendStatus(400).end();
      }
    });
  })

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