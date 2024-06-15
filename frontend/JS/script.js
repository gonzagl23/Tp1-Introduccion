
const register = document.getElementById("signup")
const labelRegister = document.querySelectorAll(".register")
const btnRegistro = document.getElementById("btn-registro")
const index = document.querySelectorAll(".index")
const btnBack = document.querySelector(".btn-back")

register.addEventListener('click',crear_tabla_registro)
btnBack.addEventListener('click',retroceder_pagina)

function crear_tabla_registro(){
    for (i = 0 ; i < labelRegister.length ; i ++){
        labelRegister[i].classList.add("on")
    }
    for (i = 0 ; i < 3 ; i++){
        index[i].classList.add("on")
    } 
   btnRegistro.classList.add("on")
   btnBack.classList.add("on")
}

function retroceder_pagina(){
    for (i = 0 ; i < labelRegister.length ; i ++){
        labelRegister[i].classList.remove("on")
    }
    for (i = 0 ; i < 3 ; i++){
        index[i].classList.remove("on")
    } 
   btnRegistro.classList.remove("on")
   btnBack.classList.remove("on")
}



