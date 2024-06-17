// Get user login

const 
    user = document.getElementById("user"),
    password = document.getElementById("password"),
    repeat_password = document.getElementById("repeat-password"),
    btnFormSigin = document.getElementById("send-form"),
    btnFormSigup = document.getElementById("btn-registro"),
    _SPACE_NUL = "",
    _ALERT_MENSSAGE = "Please enter your "


    
btnFormSigin.addEventListener('click',send_form_sigin)
btnFormSigup.addEventListener('click',send_form_sigup)


function send_form_sigup(){
    const data = {
        name: user.value,
        pass: password.value,
        repeat_pass: repeat_password.value,
    }
    fetch('http://localhost:5000/sigup',{
        method : "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response_receive)
    .then(parse_data)
    .catch(request_error)
}


function send_form_sigin(){
    if (user.value === _SPACE_NUL){
        alert(_ALERT_MENSSAGE + "username")
        return
    }
    if (password.value === _SPACE_NUL){
        alert(_ALERT_MENSSAGE + "password")
        return
    }
    data = {
        name : user.value,
        pass : password.value,
    }
    
    fetch("http://localhost:5000/signin",{
        method : "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response_receive)
    .then(parse_data)
    .catch(request_error)

}

function response_receive(data){
    return data.json()
}

function parse_data(content){
   console.log("Respuesta del servidor:",content)
}

function request_error(error){
    console.log("ERROR")
    console.log(error)
}
