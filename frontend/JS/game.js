
const clicker = document.getElementById("img-click")
let counter = document.querySelector(".counter")

clicker.addEventListener('click',clickerImage)


function clickerImage(){
    clicker.classList.toggle("activate")
    setTimeout(function(){
        clicker.classList.toggle("activate")
    },90)
    resultado = parseInt(counter.textContent) + 1 
    counter.textContent = resultado
    console.log(counter)
}