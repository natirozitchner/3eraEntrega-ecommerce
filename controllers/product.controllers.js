const Product = require('../models/product.model')



async function getProducts(req, res) {

try {
const limit = parseInt(req.query.limit) || 10;
const skip = parseInt(req.query.skip) || 0;

const filter = [];

if(req.query.name) {
    filter.push({name: {$regex: req.query.name, $options: 'i'}});
}

if(req.query.min_price) {
    filter.push({price: {$gte: req.query.min_price}});
}

const query = filter.length>0 ? { $and: filter} : {};

const products = await Product.find(query)
                                .select({description:0, __v:0})
                                .sort({name: 1})
                                .collation({locale: 'es'})
                                .limit(limit)
                                .skip(limit*skip)

const total = await Product.countDocuments(query)


    return res.status(200).send({
        message: 'Productos obtenidos correctamente',
        products,
        total
    })

} catch (error) {
    console.log(error)
    return res.status(500).send({
        message: 'Error al obtener los productos'
    })
}
}


async function createProducts(req, res) {
    try {


        const product = new Product(req.body);

        if (req.file) {
            product.image = req.file.filename
        }

        const newProduct = await product.save();

        return res.status(201).send({
            message: 'Producto creado correctamente',
            product: newProduct
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error al crear el producto'})

    }
}

// Delete products
//Edit products
//Get product by ID




module.exports = {
    getProducts,
    createProducts
}