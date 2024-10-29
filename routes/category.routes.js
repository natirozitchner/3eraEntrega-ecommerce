const router = require('express').Router();
const categoryController = require('../controllers/category.controllers')

//getCategory
router.get('/categories', categoryController.getCategories)

//postCategory
router.post('/categories', categoryController.createCategory)

//DeleteCategory
//putCategory


module.exports = router;