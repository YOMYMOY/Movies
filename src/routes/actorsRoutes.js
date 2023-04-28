const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.get('/actors', actorsController.list);
router.get('/actors/detail/:id', actorsController.detail);
router.get('/actors/valued', actorsController.valued)

//CRUD

router
    .get('/actors/add', actorsController.add)
    .post('/actors/create', actorsController.create)
    .get('/actors/edit/:id', actorsController.edit)
    .put('/actors/update/:id', actorsController.update)
    .get('/actors/delete/:id', actorsController.delete)
    .delete('/actors/delete/:id', actorsController.destroy)


module.exports = router;