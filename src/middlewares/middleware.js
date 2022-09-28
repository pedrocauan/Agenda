const { patch } = require("../../routes")

exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    res.locals.user = req.session.user //sessao do usuario logado
    next()
}

exports.outroMiddleware = (req,res,next) => {

    next()
}


exports.checkCSRF = (err, req, res, next) => {
    if(err) {
        return res.render("../views/404.ejs")
    }
    next()
}

exports.middlewareCSRF = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}