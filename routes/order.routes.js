const router= require ('express').Router();

const orderController= require('../controllers/order.controllers')

// Get orders
router.get("/orders", orderController.getOrder)

//Create order
router.post("/orders", orderController.createOrder);





module.exports = router