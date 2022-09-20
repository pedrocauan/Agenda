//MIDDLEWARE É UMA FUNÇÃO QUE É EXECUTADA ANTES DE CHEGAR NO CONTROLLER

const express = require("express")
const route = express.Router()
const homeController = require("./src/controllers/homeController.js")
const loginController = require("./src/controllers/loginController.js")




// ROTAS DA HOME
route.get("/", homeController.paginaInicial)

// ROTAS DE LOGIN
route.get("/login/index", loginController.index)




module.exports = route