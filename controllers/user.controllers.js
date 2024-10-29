const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

//FUNCIONES PARA MANEJAR DISTINTAS PETICIONES:

//Función obtener usuarios
async function getUsers(req, res) {
    try {
        const users = await User.find();
        console.log(users)

        return res.status(200).send(users);

    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener usuarios")
    }
}

//Función crear usuario:
async function createUser(req, res) {

    //Encriptar la contraseña:

    if (!req.body.password) {
        return res.status(400).send({
            ok: false,
            message: "La contraseña es requerida"
        })
    }

    const user = new User(req.body)

    bcrypt.hash(user.password, saltRounds, (error, hash) => {

        if (error) {
            return res.status(500).send({
                ok: false,
                message: "Error al crear usuario"
            })
        }

        user.password = hash;

        user.save().then((nuevoUser) => {
            console.log(nuevoUser);
            res.status(201).send(nuevoUser)

        }).catch(error => {
            console.log(error)
            res.send("El usuario no se pudo crear")
        })
    })

}

//Función para obtener un usuario específico:
async function getUserById(req, res) {
    try {

        const { id } = req.params;

        if (req.user.role !==  "admin" && id !== req.user._id) {
            return res.status(403).send({
                message: "No tienes permisos para acceder a este usuario"
            })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send("El usuario no fue encontrado")
        }

        user.password = undefined

        return res.status(200).send({
            ok: true,
            message: "El usuario fue encontrado",
            user
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send("Error al obtener usuario")
    }
}

//Función borrar usuario:
async function deleteUser(req, res) {
    try {

        const { id } = req.params

        const deletedUser = await User.findByIdAndDelete(id)

        return res.status(200).send({
            ok: true,
            message: "El usuario fue borrado correctamente",
            deletedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el producto"
        })

    }
}

//Actualizar usuario:
async function updateUser(req, res) {
    try {
        const { id } = req.params

        if (req.user.role !== "admin" && id !== req.user._id) {
            return res.status(403).send({
                message: "No tienes permisos para actualizar este usuario"
            })
        }

        const user = await User.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(200).send({
            ok: true,
            message: "Usuario actualizado correctamente",
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar usuario"
        })
    }
}

//Login:
async function login(req, res) {
    try {
        //Obtener mail y password del body
        const { mail, password } = req.body
        console.log(mail, password)

        if (!mail || !password) {
            res.status(400).send({
                message: "Email y contraseña son requeridos"
            })
        }

        const user = await User.findOne({ mail })

        if (!user) {
            return res.status(400).send({
                message: "Alguno de los datos es incorrecto"
            })
        }

        //Comparamos la contraseña del body con la del usuario en la DB
        const match = await bcrypt.compare(password, user.password)
        
        //Si no coinciden devolvemos un mensaje de error
        if (!match) {
            return res.status(400).send({
                message: "Alguno de los datos es incorrecto"
            })
        }


        // Eliminar la propiedad password
        user.password = undefined
        user.__v = undefined

        const token = jwt.sign(user.toJSON(), SECRET, {expiresIn: '1h'})

        console.log(token)



        return res.send({
            message: "Login exitoso",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error al autenticar usuario" })
    }
}



module.exports = {
    getUsers, createUser, getUserById, deleteUser, updateUser,
    login
}