const { default: mongoose } = require("mongoose")
const Contato = require("../models/ContatoModel.js")

exports.index = (req, res) => {
    res.render("contato.ejs", {
        contato: {} //envia o contato pro front depois que ele for registrado
    })
}

exports.register = async (req, res) => {
    try {

        const contato = new Contato(req.body)
        await contato.register()

        if (contato.errors.length > 0) {
            req.flash("errors", contato.errors)
            req.session.save(() => res.redirect(`/contato/index/${contato._id}`))
            return
        }

        req.flash("success", "Contato registrado com sucesso")
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    }
    catch (e) {
        console.log(e)
        return res.render("404")
    }

}

exports.editIndex = async function (req, res) {
    if (!req.params.id)
        return res.render("404")

    const contato = await Contato.buscaId(req.params.id)
    console.log(contato)
    if (!contato)
        return res.render("404")


    res.render("contato", { contato })
}

exports.edit = async function (req, res) {
    try {
        this.errors = [] //limpa os erros para que a proxima validação de edição possa ser feita
        if (!req.params.id) return res.render("404")

        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash("errors", contato.errors)
            req.session.save(() => res.redirect(`back`))
            return
        }

        req.flash("success", "Contato editado com sucesso")
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e)
        res.render("404")
    }

}

exports.delete = async function (req, res) {
    if (!req.params.id)
        return res.render("404")

    const contato = await Contato.delete(req.params.id)

    if (!contato) 
        return res.render("404")
    
    req.flash("success", "Contato apagado com sucesso")
    req.session.save(() => res.redirect(`back`))
    return

}