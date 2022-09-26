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

    async register() {
        this.valida()
        //caso exista algum valor no array errors, ele não envia o formulário
        if(this.errors.length > 0)
            return
        //checa se o usuario existe
        await this.userExists()
        
        //registra usuario
        try{
            //gera hash da senha
            const salt = bcryptjs.genSaltSync()
            this.body.password = bcryptjs.hashSync(this.body.password, salt)
            this.user = await loginModel.create(this.body)
        }
        catch(e){
            console.log(e);
        }
    }

    //verifica se o usuario já ta cadastrado na database
    async userExists() {
        try {
            //procura o user na database
            const user = await loginModel.findOne({ email: this.body.email })
            //adiciona no array de errors caso ele exista para que ele não seja registrado
            if(user) {
                this.errors.push("Usuario já existe!!")
            }

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