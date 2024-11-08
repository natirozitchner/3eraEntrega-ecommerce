require ('dotenv').config();

const app = require('./app');
const PORT = 3000
const mongoose = require('mongoose')

const DATABASE_URL = process.env.MONGO_URI;

mongoose.connect(DATABASE_URL).then(() => {

    console.log("Conexión a la DB exitosa")

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(error => console.log("Error al conectar a la DB", error))


