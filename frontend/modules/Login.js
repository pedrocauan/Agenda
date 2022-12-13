import validator from "validator"

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }

    events() {
        //Se não tiver form selecionado ele sai da função
        if(!this.form)
            return
        
        this.form.addEventListener("submit", (e) => {
            e.preventDefault()
            
            this.validate(e)
        })
    }
    //valida os forms de login e cadastro
    validate(e) {
        const el = e.target
        const emailInput = el.querySelector(`input[name="email"]`)
        const passwordInput = el.querySelector(`input[name="password"]`)
        let error = false

        if(!validator.isEmail(emailInput.value)){
            alert("E-mail inválido")
            error = true
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            alert("Senha precisa ter entre 3 e 50 caracteres")
            error = true
        }

        if(!error) {
            el.submit()
        }

        console.log(emailInput.value)
        console.log(passwordInput.value)

    }
}