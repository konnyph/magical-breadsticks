const router = require('express').Router();
const userRoute = require('./userRoutes');
const comicRoute = require('./comicRoutes');

router.use('/user', userRoute);
router.use('/comicFetch', comicRoute);

module.exports = router;