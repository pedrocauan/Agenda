const Contato = require("../models/ContatoModel.js")

exports.index = (req,res) => {
    res.render("contato.ejs")
}

exports.register = async (req,res) => {
    try{

        const contato = new Contato(req.body)
    
        await contato.register()
        if(contato.errors.length > 0) {
            req.flash("errors", contato.errors)
            req.session.save(() => res.redirect(`/contato/index/${contato._id}`))
            return
        }
    
        req.flash("success", "Contato registrado com sucesso")
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return 
    }
    catch(e) {
        console.log(e)
        return res.render("404")
    }

}

exports.editIndex = async function(req, res) {
    if(!req.params.id)
        return res.render("404")
    console.log(typeof req.params.id)
    const contato = await Contato.buscaId(req.params.id)
    console.log(contato)
    if(!contato)
        return res.render("404")
    
    
    res.render("contato.ejs", { contato })
}
