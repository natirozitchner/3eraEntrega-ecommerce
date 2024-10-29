const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers')
const validation = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

const uploadUser = require('../middlewares/uploadFileUser')

//Me devuelve todos los usuarios
router.get("/users",  userControllers.getUsers)


//Crea los usuarios
router.post("/users", [uploadUser], userControllers.createUser)

//Get de usuario por id: Solo me va a devolver un usuario específico:
router.get("/users/:id", [validation], userControllers.getUserById)


// Delete para borrar un usuario por su id
router.delete("/users/:id", [validation, isAdmin], userControllers.deleteUser)


//Update usuario (actualizar)
router.put("/users/:id", [validation], userControllers.updateUser)


//Login
router.post("/login", userControllers.login)


//Devolvemos router para que se pueda usar en otros archivos
module.exports = router