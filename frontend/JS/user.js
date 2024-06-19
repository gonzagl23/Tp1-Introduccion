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
fetch("http://localhost:5000")
.then(response_receive)
.then(tableRanking)
.catch(request_error)

function tableRanking(content){
    if (content.length == 0){
        return
    }
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
        // console.log(content[i].name)
    }
    
}


btnFormSigin.addEventListener('click',sendSignin)
btnFormSigup.addEventListener('click',sendRegister)


// REGISTER
function sendRegister(){
    verifyInput()
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
        pass: password.value,
        money: 0,
        date: Date(),
    }
    fetch('http://localhost:5000/sigup',{
        method : "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response_receive)
    .then(parseDataRegister)
    .catch(request_error)
}
function parseDataRegister(content){
    if (content.message == null){
        alert("ERROR") 
        return
    }
    alert(`WELCOME!!!!  ${content.message.name}`)
    location.reload()
}



// LOGIN
function sendSignin(){
    verifyInput()
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
    .then(response_receive)
    .then(parseDataLogIn)
    .catch(request_error)

}

function response_receive(data){
    return data.json()
}

function parseDataLogIn(content){
//    console.log("Respuesta del servidor:",(content.message === "ERROR"))
   if (content.message === "ERROR"){
        alert("Invalid username or password")
        return
   }
//    rederict game
   window.location.href = `./pages/game.html?id=${content.message.id}`

}

function request_error(error){
    console.log("ERROR")
    console.log(error)
}


function verifyInput(){
    if (user.value === _SPACE_NUL){
        alert(_ALERT_MENSSAGE + "username")
        return
    }
    if (password.value === _SPACE_NUL){
        alert(_ALERT_MENSSAGE + "password")
        return
    }
}



