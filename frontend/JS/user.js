// Get user login

const 
    user = document.getElementById("user"),
    password = document.getElementById("password"),
    repeat_password = document.getElementById("repeat-password"),
    btnFormSigin = document.getElementById("btn-login"),
    btnFormSigup = document.getElementById("btn-registro"),
    _SPACE_NUL = "",
    _ALERT_MENSSAGE = "Please enter your ",
    _TABLE_RANKING = document.getElementById('table')


    


// TABLE RANKING
fetch("http://localhost:5000/table_ranking")
.then(response => response.json())
.then(tableRanking)
.catch(request_error)

function tableRanking(content){
    // if (content.length == 0){
    //     return
    // }
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


btnFormSigin.addEventListener('click',sendSignin)
btnFormSigup.addEventListener('click',sendRegister)


// REGISTER
function sendRegister(){
    if (verifyInput() === false){
        return;
    }
    if (repeat_password.value === _SPACE_NUL){
        alert("complete input repeat paswword please")
        return
    }
    if (password.value != repeat_password.value){
        alert('password not coincide')
        return
    }
    const data = {
        name: user.value,
        password: password.value,
        money: 0,
    }
    fetch('http://localhost:5000/sigup',{
        method : "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(parseDataRegister)
    .catch(request_error)
}
function parseDataRegister(content){
    console.log(content)
    if (content.message === "ERROR"){
        alert("ERROR") 
        return
    }else{
        alert(`WELCOME!!!!  ${user.value}`)
    }
    location.reload()
}



// LOGIN
function sendSignin(){
    if (verifyInput() === false){
        return;
    }
    data = {
        name : user.value,
        password : password.value,
    }
    fetch("http://localhost:5000/signin",{
        method : "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(parseDataLogIn)
    .catch(request_error)

}

function parseDataLogIn(content){
//    console.log("Respuesta del servidor:",(content.message === "ERROR"))
    // console.log(content.message)
   if (content.message === "ERROR"){
        alert("Invalid username or password")
        return
   }
//    rederict game
   window.location.href = `./pages/game.html?id=${content.message}`//&worker=${content.worker}&house=${content.house}&departament=${content.departament}&mansion=${content.mansion}`

}

function request_error(error){
    console.log("ERROR")
    console.log(error)
}


function verifyInput(){
    if (user.value === _SPACE_NUL){
        alert(_ALERT_MENSSAGE + "username")
        return false
    }
    if (password.value === _SPACE_NUL){
        alert(_ALERT_MENSSAGE + "password")
        return false
    }
    return true
}



