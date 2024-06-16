// Get user login

const user = document.getElementById("user")
const password = document.getElementById("password")
const repeat_password = document.getElementById("repeat-password")
const btnForm = document.getElementById("send-form")
const btnFormSingup = document.getElementById("btn-registro")

btnForm.addEventListener('click',send_form_sigin)
btnFormSingup.addEventListener('click',send_form_singup)


function send_form_singup(){
    const data = {
        name: user.value,
        pass: password.value,
        repeat_pass: repeat_password.value,
    }
    console.log(data)
}


function send_form_sigin(){
    const data = {
        name: user.value,
        pass: password.value,
    }
    console.log(data)
    // fetch({
    //     method: 'POST',
    //     headers:{
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response_reciver)
    // .then(parse_data)
    // .catch(request_error)

}

function response_receive(data){
    console.log(data)
    // return data.json()
}

function parse_data(content){
    console.log(content)
}

function request_error(error){
    console.log("ERROR")
    console.log(error)
}
