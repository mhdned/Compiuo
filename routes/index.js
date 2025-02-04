let express = require('express');
let router = express.Router();

// require routes
const compressRoutes = require('./compress');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'COMPIUO' });
});

// use routes
router.use('/compress', compressRoutes);

module.exports = router;
