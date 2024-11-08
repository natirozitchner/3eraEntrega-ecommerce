const Product = require('../models/product.model')


async function getProducts(req, res) {

    try {

        const products = await Product.find()   

        return res.status(200).send({
            message: 'Productos obtenidos correctamente',
            products,
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
        return res.status(500).send({ message: 'Error al crear el producto' })

    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        return res.status(200).send({
            ok: true,
            message: "El producto fue encontrado",
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error al obtener el producto'
        })

    }
}

async function deleteProduct(req, res) {
    try {

        const { id } = req.params

        const deletedProduct= await Product.findByIdAndDelete(id)

        return res.status(200).send({
            ok: true,
            message: "El producto fue borrado correctamente",
            deletedProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el producto"
        })

    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params

        const product = req.body;

        if(req.file) {
            product.image = req.file.filename
        }

        const updateProd = await Product.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente",
            products: updateProd
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar producto"
        })
    }
}



module.exports = {
    getProducts,
    createProducts,
    getProductById,
    deleteProduct,
    updateProduct
}