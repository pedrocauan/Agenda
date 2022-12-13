const mongoose = require("mongoose")
const validator = require("validator")

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: {type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    telefone: { type: String, required: false, default: "" },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model("Contato", ContatoSchema)

function Contato (body) {
    this.body = body
    this.errors = []
    this.contato = null

}


Contato.prototype.register =  async function() {
    this.valida()

    if(this.errors.length > 0)
        return
    this.contato = await ContatoModel.create(this.body)

}
 
Contato.prototype.valida = function() {
    //validaçao
    this.cleanUp()

    // Ve se o email é válido
    if(this.body.email && (!validator.isEmail(this.body.email)))
        this.errors.push("Email inválido !!")
    //Ve se o campo nome foi preenchido
    if(!this.body.nome)
        this.errors.push(`Nome é um campo obrigatório !!`)
    
    // ve se o contato está sendo cadastrado sem nenhuma informação
    if(!this.body.email && !this.body.telefone){
        this.errors.push(`pelo menos um contato precisa ser enviado !! Email ou telefone`)
    }
    
   

}

Contato.prototype.cleanUp = function() {
    //se alguns dos campos nao forem strings, é trocado por uma string vazia
    for(const key in this.body) {
        if(typeof this.body[key] !== "string")
            this.body[key] = ""
               
    }
    //Tira o csrf token
    this.body  = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    }

}

//edita os dados da database
Contato.prototype.edit = async function(id) {
     this.contato = null
     if(typeof id !== "string") return

     this.valida()

     if(this.errors.length > 0) return

    this.contato =  await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
}

// === METODOS ESTÁTICOS (NÃO VAI PRO PROTOTYPE) ===

//busca o contato na database
Contato.buscaId = async function(id){
    try {
        if(typeof id !== "string")
            return
        const user = await ContatoModel.findById(id)
        console.log(user)
        return user
    } catch(e) {
        console.log(e)
    }
}

//busca todos os contatos no banco e retorna pra home controller
Contato.buscaContato = async function(){
    //busca os contatos em ordem decrescente (-1)
    const contatos = await ContatoModel.find().sort({ criadoEm: -1 })
    return contatos
}

Contato.delete = async function(id){
    if(typeof id !== "string") return

    //findOneAndDelete deleta o registro da database
    const contato = await ContatoModel.findOneAndDelete( {_id:  id })
    console.log(contato)
    return contato
}

module.exports  = Contato 