const express = require ('express');
const router = express.Router();
const productController = require('../controllers/product.controllers')

const upload = require('../middlewares/uploadFile');
const validation = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get("/products", productController.getProducts)

router.post("/products", [validation, isAdmin,upload], productController.createProducts) 

router.get("/products/:id", productController.getProductById)

router.delete("/products/:id", [ validation, isAdmin], productController.deleteProduct)

router.put("/products/:id", [validation, isAdmin, upload], productController.updateProduct)



module.exports = router