Agenda criada com NodeJS em arquitetatura de projeto MVC

1. [X] - Template ejs.
1. [X] - Criação do login.
1. [X] - Registro dos usuários.


for(let i = 0; i < cardBlock.length; i++) {
    cardBlock[i].addEventListenner("click", (e) => {

        let clickedElement = e.target;
        let btn = document.getElementById("OpenInfos")

        console.log(clickedElement)
        if(clickedElement = btn ){
            console.log("aa")
            cardNone.style.display = "flex"
        }
    })
}