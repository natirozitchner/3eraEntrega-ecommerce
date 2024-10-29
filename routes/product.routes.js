const express = require ('express');
const router = express.Router();
const productController = require('../controllers/product.controllers')

const upload = require('../middlewares/uploadFile')

router.get("/products", productController.getProducts)

router.post("/products", [upload], productController.createProducts)

// router.put("/products", [auth, isAdmin, upload], productController.updateProduct)



module.exports = router