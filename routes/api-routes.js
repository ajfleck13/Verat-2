const Save = require('../models/Save');
const User = require('../models/User');


module.exports = function (app) {

  app.get('/api/mysaves/:username', function (req, res) {
    User.find({username: req.params.username})
      .populate("Save")
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/api/publishedsave/:username/:repo', function (req, res) {
    Save.find({username: req.params.username, reponame: req.params.reponame})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post('/api/mysave', function (req, res) {
    Save.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post('/api/publishedsave', function (req, res) {
    Save.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
}