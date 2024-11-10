const Order = require('../models/order.model')

async function getOrder(req, res) {
    try {
        const orders = await Order.find()
                                    .populate('user', "name mail")
                                    .populate('products.product', "name price image")
        return res.status(200).send({
            message: 'Orders found',
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'No se pudieron obtener las ordenes'})
    }
}


async function createOrder(req, res) {
    try {
        const  order = new Order(req.body);

        const newOrder = await order.save();

        return res.status(201).send({
            message: 'Orden creada',
            newOrder
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
    
}



module.exports = {
    createOrder,
    getOrder
}