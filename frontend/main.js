import "core-js/stable" ;
import "regenerator-runtime/runtime"
import Login from './modules/Login'
import Contato from './modules/Contato'
// import './assets/css/style.css';

//valida a tela de login e cadastro
const login = new Login(".form-login")
const cadastro = new Login(".form-cadastro")

cadastro.init()
login.init()

//valida o formulário de contatos da agenda
// const contato = new Contato(".form-contato")
// contato.init()

