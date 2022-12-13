//MIDDLEWARE É UMA FUNÇÃO QUE É EXECUTADA ANTES DE CHEGAR NO CONTROLLER

const express = require("express")
const route = express.Router()
const homeController = require("./src/controllers/homeController.js")
const loginController = require("./src/controllers/loginController.js")
const contatoController = require("./src/controllers/contatoController.js")

const { loginRequired } = require("./src/middlewares/middleware.js")
        



// ROTAS DA HOME
route.get("/", homeController.index)

// ROTAS DE LOGIN
route.get("/login/index", loginController.index)
route.post("/login/register", loginController.register)
route.post("/login/login", loginController.login)
route.get("/login/logout", loginController.logout)

//ROTAS DE CONTATO
route.get("/contato/index", loginRequired,  contatoController.index)
route.post("/contato/register", loginRequired,  contatoController.register)
route.get("/contato/index/:id", loginRequired, contatoController.editIndex )
route.post("/contato/edit/:id", loginRequired, contatoController.edit )



module.exports = route