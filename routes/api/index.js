const router = require('express').Router();
const userRoute = require('./userRoutes');

router.use('/user', userRoute);

module.exports = router;