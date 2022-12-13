const Contato = require("../models/ContatoModel")

exports.index = async (req, res) => {
    /*Envia dados pro front (index.ejs)*/
    const contatos = await Contato.buscaContato()
    
    res.render("index", { contatos })
    return 
}