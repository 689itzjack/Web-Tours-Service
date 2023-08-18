const express = require('express'),
    userRoutes = require('./users');

var router = express.Router();


router.get('/users', userRoutes.read_users);
router.post('/users', userRoutes.create_user);
router.put('/users/:id', userRoutes.updateTour);
router.put('/nameTour/:id', userRoutes.createSiteInPath);
router.delete('/delete_Tour/:id', userRoutes.deleteTour);
router.delete('/delete_Path/:id', userRoutes.deleteSite);
module.exports = router;
