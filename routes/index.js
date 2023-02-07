const router = require('express').Router();

const apiRoutes = require('./api');

const database = require('../database');
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express', session : req.session});
});

router.use('/api', apiRoutes);

module.exports = router;
