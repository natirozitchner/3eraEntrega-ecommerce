
const Category = require('../models/category.model')

async function getCategories(req, res) {
    try {
        const categories = await Category.find()

        return res.status(200).send({
            message: "Categorias obtenidas correctamente",
            categories
        })



    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener categorias"
        })
    }
}

async function createCategory(req, res) {
    try {
        const data = new Category(req.body)

        const category = await data.save()

        return res.status(201).send({
            message: "Categoria creada correctamente",
            category
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener categorias"
        })
    }


}


module.exports = {
    getCategories,
    createCategory
}