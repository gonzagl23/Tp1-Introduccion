
const
    _PARAMS = new URLSearchParams(window.location.search),
    _ID = _PARAMS.get("id"),
    _BTN_SIGNOUT = document.getElementById("sign-out")

let 
    user = document.getElementById("username")
    money = document.getElementById("money-user")

let dataUsername = {}


fetch(`http://localhost:5000/get_data/${_ID}`)
.then(response => response.json())
.then(dataUser)
.catch(errorData)


_BTN_SIGNOUT.addEventListener('click',sendDataUser)


function sendDataUser(){
    console.log(money.textContent)
    if (confirm("You're sure?")){
        console.log(money.textContent)
        fetch(`http://localhost:5000/update_data`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id : dataUsername.id,
                name: dataUsername.name,
                money: parseInt(money.textContent),
            })
        })
        .then(response => response.json())
        .then(updateData)
        .catch(errorData)
    }
}

function updateData(content){
    if (content.message !== "SUCCES"){
        window.location.href = '../index.html'
    }else{
        alert("ERROR")
    }
}


function dataUser(content){
    user.textContent = content.message.name
    money.textContent = content.message.money
    
    dataUsername = {
        id : content.message.id,
        name: content.message.name,
        money: content.message.money
    }
}


function errorData(content){
    console.log("ERROR")
    console.log(content)
}