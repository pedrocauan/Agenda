require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
//link da database
//conecta com a database
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        //emite um sinal pra database
        app.emit("pronto")
    })
    .catch(e => console.log(e))
//importando bibliotecas do cookie de sessao
const session  = require("express-session")
//salva as sessões na base de dados
const MongoStore = require("connect-mongo")
//uma mensagem que some depois que é lida
const flash = require("connect-flash")
const routes = require("./routes")
const path = require("path")
// const helmet = require("helmet")
//faz com que nenhum site externo possa postar coisas dentro da aplicação
const CSRF = require("csurf")
const { middlewareGlobal, checkCSRF, middlewareCSRF} = require("./src/middlewares/middleware.js")

//teste

console.log("aaa")
//Helmet
// app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//imagens css javascript, arquivos que podem ser utilizados  na nossa aplicação que sao estaticos
app.use(express.static(path.resolve(__dirname, "public")))

//definindo cookies de sessão
const sessionOptions = session({
    secret: 'ABABABA',
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 /*duração da sessão em milissegundos ( 7 dias)*/,
        httpOnly: true /*flag que faz  as requisições serem enviadas somente via http*/
    }
    
})

//usando cookies de sessao
app.use(sessionOptions)
app.use(flash())

//path.resolve -> informa o caminho absoluto do arquivo
app.set("views",path.resolve(__dirname, "src", "views") )
app.set("view engine", "ejs")

app.use(CSRF()) /*evita o csrf*/
//Nossos próprios middlewares
app.use(middlewareGlobal)
app.use(checkCSRF)
app.use(middlewareCSRF) /*valida o token csrf*/

// ROTAS
app.use(routes)

//se ele pegar o sinal, conecta com a database na porta 3000
app.on("pronto", () => {
    app.listen(3000, () => {
        console.log("https://localhost:3000")
        console.log("rodando na 3000")
    })

})


