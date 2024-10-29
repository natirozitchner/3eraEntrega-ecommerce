const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')

app.use( cors() )

app.use(express.static('public'))

//Habilitamos el metodo JSON para poder leer los datos del body en una request:
app.use(express.json())

app.use([userRoutes, productRoutes, categoryRoutes, orderRoutes])

module.exports = app