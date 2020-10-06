const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.app.locals.name);
  req.app.locals.name = "No NO No";
  console.log(req.app.locals.name);
  res.render('index', { title: 'Express' });
});

module.exports = router;
