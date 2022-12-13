import { validate } from "schema-utils"
import validator from "validator"

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        if(!this.form) return 
        this.events()
    }

    events() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target
        const nomeInput = el.querySelector(`input[name="nome"]`)
        console.log(nomeInput)
        let error = false
    }

}