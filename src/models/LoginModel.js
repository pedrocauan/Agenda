const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: {type: String, required: true}
})

const loginModel = mongoose.model("Login", loginSchema)

//valida o model
class Login {
    constructor(body) {
        this.body = body
        this.errors = [] //controla se o usuario pode ou nao ser criado
        this.user = null
    }


    async login() {
        this.valida()
        if(this.errors.length > 0)
            return
        this.user = await loginModel.findOne({ email: this.body.email })
        //ve se o  usuario existe na db
        if(!this.user){
            this.errors.push("Usuario ou senha inválidos!!")
            return 
        }
        //ve se a senha é valida
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push("Senha inválida !!")
            this.user = null //reseta a variavel user para a proxima sessão
            return
        }


    }

    async register() {
        this.valida()
        //caso exista algum valor no array errors, ele não envia o formulário
        if(this.errors.length > 0)
            return
        //checa se o usuario existe
        const userExists =  await this.userExists()
        console.log(userExists)
        if(userExists)
            return 
        /*registra usuario*/
        
        //gera hash da senha
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await loginModel.create(this.body)
    
    }

    //verifica se o usuario já ta cadastrado na database
    async userExists() {
        try {
            //procura o user na database
            this.user = await loginModel.findOne({ email: this.body.email })
            //adiciona no array de errors caso ele exista para que ele não seja registrado
            if(this.user) {
                this.errors.push("Usuario já existe!!")
            }
            return this.user
   

        }

        catch(e) {
            console.log(e)
        }
    }

    valida(){
        //validaçao
        this.cleanUp()

        // Ve se o email é válido
        if(!validator.isEmail(this.body.email))
            this.errors.push("Email inválido !!")
        // ve se senha esta  entre 3 e 50 caracteres
        if(this.body.password.length < 3  || this.body.password.length >= 50)
            this.errors.push("A senha precisa ter entre 3 e 50 caracteres")
        
        

    }

    cleanUp() {
        //se alguns dos campos nao forem strings, é trocado por uma string vazia
        for(const key in this.body) {
            if(typeof this.body[key] !== "string")
                this.body[key] = ""
                   
        }
        //Tira o csrf token
        this.body  = {
            email: this.body.email,
            password: this.body.password
        }

    }
}

module.exports = Login