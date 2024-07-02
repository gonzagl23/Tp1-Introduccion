

//  CREATE TABLE SIGNIN AND SIGNUP
const 
    btnConfirm = document.getElementById("btn-confirm"),
    btnRegister = document.getElementById("btn-register"),
    btnBack = document.getElementById("btn-back"),
    btnLogin = document.getElementById("btn-login"),
    formRegister = document.getElementById("container-register")
    


btnRegister.addEventListener('click',createTableRegister)
btnBack.addEventListener('click',createFormLogin)

function createTableRegister(){
    btnRegister.classList.add("activo")
    btnBack.classList.add("activo")
    formRegister.classList.add("activo")
    btnConfirm.classList.add("activo")
    btnLogin.classList.add("activo")
}

function createFormLogin(){
    btnRegister.classList.remove("activo")
    btnBack.classList.remove("activo")
    formRegister.classList.remove("activo")
    btnConfirm.classList.remove("activo")
    btnLogin.classList.remove("activo")
}



// GET TABLE RANKING
fetch("http://localhost:5000/table_ranking")
.then(response => response.json())
.then(tableRanking)
.catch(content => console.log(content))

function tableRanking(content){
    for (i = 0; i < content.length && i < 15; i ++){
        let divRank = document.createElement("div")
        divRank.classList.add("user-data")
        let imgCopa = document.createElement("img")
        if (i === 0){
            imgCopa.src = "./assets/img/copa-de-oro.png"
        }else if (i === 1){
            imgCopa.src = './assets/img/copa-de-plata.png'
        }else{
            imgCopa.src = './assets/img/mate.png'
        }
        imgCopa.classList.add("img-copa")
        let user = document.createElement("p")
        user.textContent = content[i].name
        let imgMoney = document.createElement("img")
        imgMoney.classList.add("img-money-bag")
        imgMoney.src = './assets/img/bolsa-de-dinero.png'
        let moneyUser = document.createElement("p")
        moneyUser.textContent = content[i].money
        divRank.appendChild(imgCopa)
        divRank.appendChild(user)
        divRank.appendChild(imgMoney)
        divRank.appendChild(moneyUser)
        _TABLE_RANKING.appendChild(divRank)
    }
}

//  VALIDATION USERNAME OR REGISTER 

const 
    username = document.getElementById("user"),
    password = document.getElementById("password"),
    repeat_password = document.getElementById("repeat-password"),
    _SPACE_NUL = "",
    _TABLE_RANKING = document.getElementById('table'),
    _ERROR_USERNAME = "Please enter your username",
    _ERROR_PASSWORD = "Please enter your password",
    _ERROR_REPEAT_PASSWORD = "Complete input repeat paswword please",
    _ERROR_PASSWORD_INVALID = 'password not coincide'





btnLogin.addEventListener('click',sendSignin)
btnConfirm.addEventListener('click',sendRegister)


// REGISTER
function sendRegister(){
    if (verifyInput() === false){
        return;
    }
    if (repeat_password.value === _SPACE_NUL){
        alert(_ERROR_REPEAT_PASSWORD)
        return
    }
    if (password.value != repeat_password.value){
        alert(_ERROR_PASSWORD_INVALID)
        return
    }
    fetch('http://localhost:5000/sigup',{
        method : "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:username.value,
            password:password.value,
            money:0,

        })
    })
    .then(response => response.json())
    .then(parseDataRegister)
    .catch(content => console.log(content))
}
function parseDataRegister(content){
    if (content.message === "ERROR"){
        alert("ERROR") 
        return
    }else{
        alert(`WELCOME!!!!  ${username.value}`)
    }
    location.reload()
}

function verifyInput(){
    if (username.value === _SPACE_NUL){
        alert(_ERROR_USERNAME)
        return false
    }
    if (password.value === _SPACE_NUL){
        alert(_ERROR_PASSWORD)
        return false
    }
    return true
}

// LOGIN
function sendSignin(){
    if (verifyInput() === false){
        return;
    }
    fetch("http://localhost:5000/signin",{
        method : "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name: username.value,
            password: password.value,
        })
    })
    .then(response => response.json())
    .then(parseDataLogIn)
    .catch(content => console.log(content))

}

function parseDataLogIn(content){
   if (content.message === "ERROR"){
        alert("Invalid username or password")
        return
   }
//    rederict game
   window.location.href = `./pages/game.html?id=${content.message}`

}


