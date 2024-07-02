let 
    user = document.getElementById("username"),
    money = document.getElementById("money-user"),
    objectAmount= document.querySelectorAll(".amount"),
    idProperty = []


const 
    _DATA_WORKER = 0,
    _DATA_HOUSE = 1,
    _DATA_DEPARTAMENT = 2,
    _DATA_MANSION = 3,
    _MAX_INSERT_IMAGE = 11,
    _CLICKER_IMAGE = document.getElementById("img-click"),
    _AMOUNT = 1,
    _INSERT_IMAGE_BUY = document.querySelectorAll(".buy-box"),
    _TABLE_BUY = document.querySelectorAll(".shop"),
    _TITLE_SHOP = document.querySelectorAll(".title"),
    _PARAMS = new URLSearchParams(window.location.search),
    _ID = _PARAMS.get("id"),
    _BTN_SIGNOUT = document.getElementById("sign-out"),
    _TITLE_PROPERTY_BUY = document.querySelectorAll(".property-buy"),
    _PRICE = document.querySelectorAll(".price"),
    _PROFIT = document.querySelectorAll('.profit'),
    _DESCRIPTION_TABLE = document.querySelectorAll(".description-table"),
    _COLLECT_WORKER = document.getElementById('worker-collect'),
    _COLLECT_HOUSE = document.getElementById('house-collect'),
    _COLLECT_DEPARTAMENT = document.getElementById('departament-collect'),
    _COLLECT_MANSION = document.getElementById('mansion-collect')



// SIGNOUT USER 
_BTN_SIGNOUT.addEventListener('click',sendDataUser)


function sendDataUser(){
    if (confirm("You're sure?")){
        updateUser()
        window.location.href = '../index.html'
    }
}

function updateUser(){
    fetch(`http://localhost:5000/update_user`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id : _ID,
            money: money.textContent,
        })
    })
}

function errorData(content){
    console.log("ERROR")
    console.log(content)
}

//-------------- IMAGE CLICKER----------------------//
_CLICKER_IMAGE.addEventListener('click',clickerImage)

function clickerImage(){
    _CLICKER_IMAGE.classList.toggle("activate")    
    setTimeout(function(){
        _CLICKER_IMAGE.classList.toggle("activate")
    },90)
    money.textContent = parseInt(money.textContent) + _AMOUNT
    controlMoneyShop(parseInt(money.textContent))
    updateUser()
}

function controlMoneyShop(money){
    for (i = 0 ; i < _PRICE.length ; i ++ ){
        if (money < parseInt(_PRICE[i].textContent)){
           _TABLE_BUY[i].classList.remove('activate')
           _DESCRIPTION_TABLE[i].classList.remove('activate')
        }else{
            _TABLE_BUY[i].classList.add("activate")
            _DESCRIPTION_TABLE[i].classList.add("activate")
        }
    }
}



// ----------GET DATA USER-------------------//
fetch(`http://localhost:5000/get_data_user/${_ID}`)
.then(response => response.json())
.then(dataUser)
.catch(errorData)

function dataUser(content){
    user.textContent = content.name
    money.textContent = content.money
    controlMoneyShop(parseInt(money.textContent))
}



//------------- GET DATA TABLE INFORMATION------------------------//
fetch("http://localhost:5000/information_table/")
.then(response => response.json())
.then(getDataTable)
.catch(errorData)

function getDataTable(content){
    for (i = 0; i < content.length ; i ++){
        _TITLE_SHOP[i].textContent = content[i].category
        _TITLE_PROPERTY_BUY[i].textContent = content[i].category,
        _PRICE[i].textContent = content[i].cost_property,
        _PROFIT[i].textContent =  content[i].profits
        idProperty.push(content[i].id)
    }
}


// ------------------GET OBJECTS BUY ---------------------// 
fetch(`http://localhost:5000/property_buy/${_ID}`)
.then(response => response.json())
.then(getDataObjectBuy)
.catch(errorData)


function getDataObjectBuy(content){
    for (i = 0 ;i < content.length ; i ++){
        if (content[i].id_property_type ===  idProperty[_DATA_WORKER]){
            if (parseInt(objectAmount[_DATA_WORKER].textContent) < _MAX_INSERT_IMAGE){
                const imgWorker = document.createElement("img")
                imgWorker.src = "../assets/img/obrero.png"
                if (content[i].state === true){
                    imgWorker.classList.add('worker-buy')
                    _COLLECT_WORKER.classList.add('activate')
                }
                _INSERT_IMAGE_BUY[_DATA_WORKER].appendChild(imgWorker)
            }
            objectAmount[_DATA_WORKER].textContent = parseInt(objectAmount[_DATA_WORKER].textContent) + _AMOUNT
        }else if (content[i].id_property_type ===  idProperty[_DATA_HOUSE]){
            if (parseInt(objectAmount[_DATA_HOUSE].textContent) < _MAX_INSERT_IMAGE){
                const imgHouse = document.createElement("img")
                imgHouse.src = "../assets/img/hogar.png"
                if (content[i].state === true){
                    imgHouse.classList.add('house-buy')
                    _COLLECT_HOUSE.classList.add("activate")
                }
                _INSERT_IMAGE_BUY[_DATA_HOUSE].appendChild(imgHouse)
            }
            objectAmount[_DATA_HOUSE].textContent = parseInt(objectAmount[_DATA_HOUSE].textContent) + _AMOUNT

        }else if (content[i].id_property_type ===  idProperty[_DATA_DEPARTAMENT]){
            if (parseInt(objectAmount[_DATA_DEPARTAMENT].textContent) < _MAX_INSERT_IMAGE){
                const imgDepartament = document.createElement("img")
                imgDepartament.src = "../assets/img/departamento.png"
                if (content[i].state === true){
                    imgDepartament.classList.add('departament-buy')
                    _COLLECT_DEPARTAMENT.classList.add("activate")
    
                }
                _INSERT_IMAGE_BUY[_DATA_DEPARTAMENT].appendChild(imgDepartament)
            }
            objectAmount[_DATA_DEPARTAMENT].textContent = parseInt(objectAmount[_DATA_DEPARTAMENT].textContent) + _AMOUNT

        }else if (content[i].id_property_type ===  idProperty[_DATA_MANSION]){
            if (parseInt(objectAmount[_DATA_MANSION].textContent) < _MAX_INSERT_IMAGE){
                const imgMansion = document.createElement("img")
                imgMansion.src = "../assets/img/hotel.png"
                if (content[i].state === true){
                    imgMansion.classList.add('mansion-buy')
                    _COLLECT_MANSION.classList.add("activate")
    
                }
                _INSERT_IMAGE_BUY[_DATA_MANSION].appendChild(imgMansion)
            }
            objectAmount[_DATA_MANSION].textContent = parseInt(objectAmount[_DATA_MANSION].textContent) + _AMOUNT

        }
    }
}





// ------------------- COLLECT BUYS-------------------------------//

_COLLECT_WORKER.addEventListener('click',collectWorker)
_COLLECT_HOUSE.addEventListener('click',collectHouse)
_COLLECT_DEPARTAMENT.addEventListener('click',collectDepartament)
_COLLECT_MANSION.addEventListener('click',collectMansion)

function collectWorker(){
    workerAmount = document.querySelectorAll(".worker-buy")
    money.textContent = parseInt(money.textContent) + (workerAmount.length * parseInt(_PROFIT[_DATA_WORKER].textContent))
    objectAmount[_DATA_WORKER].textContent = parseInt(objectAmount[_DATA_WORKER].textContent) - workerAmount.length
    for (i = 0 ; i < workerAmount.length ; i ++){
        workerAmount[i].remove()
    }
    _COLLECT_WORKER.classList.remove("activate")
    fetch(`http://localhost:5000/delete_property/${_ID}/property_id/${idProperty[_DATA_WORKER]}`,{
        method : "DELETE",
        headers:{
            'Content-Type':'application/json'
        },
    })
    updateUser()
    controlMoneyShop(parseInt(money.textContent))
}

function collectHouse(){
    houseAmount = document.querySelectorAll('.house-buy')
    money.textContent = parseInt(money.textContent) + (houseAmount.length * parseInt(_PROFIT[_DATA_HOUSE].textContent))
    objectAmount[_DATA_HOUSE].textContent = parseInt(objectAmount[_DATA_HOUSE].textContent) - houseAmount.length
    for (i = 0 ; i < houseAmount.length ; i ++){
        houseAmount[i].remove()
    }
    _COLLECT_HOUSE.classList.remove("activate")
    console.log(idProperty[_DATA_HOUSE])
    fetch(`http://localhost:5000/delete_property/${_ID}/property_id/${idProperty[_DATA_HOUSE]}`,{
        method : "DELETE",
        headers:{
            'Content-Type':'application/json'
        },
    })
    updateUser()
    controlMoneyShop(parseInt(money.textContent))

}

function collectDepartament(){
    departamentAmount = document.querySelectorAll('.departament-buy')
    money.textContent = parseInt(money.textContent) + (departamentAmount.length * parseInt(_PROFIT[_DATA_DEPARTAMENT].textContent))
    objectAmount[_DATA_DEPARTAMENT].textContent = parseInt(objectAmount[_DATA_DEPARTAMENT].textContent) - departamentAmount.length
    for (i = 0 ; i < departamentAmount.length ; i ++){
        departamentAmount[i].remove()
    }
    _COLLECT_DEPARTAMENT.classList.remove("activate")
    fetch(`http://localhost:5000/delete_property/${_ID}/property_id/${idProperty[_DATA_DEPARTAMENT]}`,{
        method : "DELETE",
        headers:{
            'Content-Type':'application/json'
        },
    })
    updateUser()
    controlMoneyShop(parseInt(money.textContent))
}

function collectMansion(){
    mansionAmount = document.querySelectorAll('.mansion-buy')
    money.textContent = parseInt(money.textContent) + (mansionAmount.length * parseInt(_PROFIT[_DATA_MANSION].textContent))
    objectAmount[_DATA_MANSION].textContent = parseInt(objectAmount[_DATA_MANSION].textContent) - mansionAmount.length
    for (i = 0 ; i < mansionAmount.length ; i ++){
        mansionAmount[i].remove()
    }
    _COLLECT_MANSION.classList.remove("activate")
    fetch(`http://localhost:5000/delete_property/${_ID}/property_id/${idProperty[_DATA_MANSION]}`,{
        method : "DELETE",
        headers:{
            'Content-Type':'application/json'
        },
    })
    updateUser()
    controlMoneyShop(parseInt(money.textContent))


}

//-------------------- TABLE SHOP---------------------//
_TABLE_BUY[_DATA_WORKER].addEventListener('click',clickTableWorker)
_TABLE_BUY[_DATA_HOUSE].addEventListener('click',clickTableHouse)
_TABLE_BUY[_DATA_DEPARTAMENT].addEventListener('click',clickTableDepartament)
_TABLE_BUY[_DATA_MANSION].addEventListener('click',clickTableMansion)


function clickTableWorker(){
   if (parseInt(money.textContent) >= parseInt(_PRICE[_DATA_WORKER].textContent)){
        if (parseInt(objectAmount[_DATA_WORKER].textContent) < _MAX_INSERT_IMAGE){
            const imgWorker = document.createElement("img")
            imgWorker.src = "../assets/img/obrero.png"
            _INSERT_IMAGE_BUY[_DATA_WORKER].appendChild(imgWorker)
        }
        fetch(`http://localhost:5000/create_property`,{
            method : "POST",
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'id_user': _ID,
                "id_property" : idProperty[_DATA_WORKER]
            })
        })
        money.textContent = parseInt(money.textContent) - parseInt(_PRICE[_DATA_WORKER].textContent)
        objectAmount[_DATA_WORKER].textContent = parseInt(objectAmount[_DATA_WORKER].textContent) + _AMOUNT 
   }
   controlMoneyShop(parseInt(money.textContent))
}

function clickTableHouse(){
    if (parseInt(money.textContent) >= parseInt(_PRICE[_DATA_HOUSE].textContent)){
        if (parseInt(objectAmount[_DATA_HOUSE].textContent) < _MAX_INSERT_IMAGE){
            const imgHouse = document.createElement("img")
            imgHouse.src = "../assets/img/hogar.png"
            _INSERT_IMAGE_BUY[_DATA_HOUSE].appendChild(imgHouse)
        }
        fetch(`http://localhost:5000/create_property`,{
            method : "POST",
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'id_user': _ID,
                "id_property" : idProperty[_DATA_HOUSE]
            })
        })
        money.textContent = parseInt(money.textContent) - parseInt(_PRICE[_DATA_HOUSE].textContent)
        objectAmount[_DATA_HOUSE].textContent = parseInt(objectAmount[_DATA_HOUSE].textContent) + _AMOUNT
    }
    controlMoneyShop(parseInt(money.textContent))
 }

 function clickTableDepartament(){
    if (parseInt(money.textContent) >= parseInt(_PRICE[_DATA_DEPARTAMENT].textContent)){
        if (parseInt(objectAmount[_DATA_DEPARTAMENT].textContent) < _MAX_INSERT_IMAGE){
            const imgDepartament = document.createElement("img")
            imgDepartament.src = "../assets/img/departamento.png"
            _INSERT_IMAGE_BUY[_DATA_DEPARTAMENT].appendChild(imgDepartament)
        }
        fetch(`http://localhost:5000/create_property`,{
            method : "POST",
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'id_user': _ID,
                "id_property" : idProperty[_DATA_DEPARTAMENT],
            })
        })
        money.textContent = parseInt(money.textContent) - parseInt(_PRICE[_DATA_DEPARTAMENT].textContent)
        objectAmount[_DATA_DEPARTAMENT].textContent = parseInt(objectAmount[_DATA_DEPARTAMENT].textContent) + _AMOUNT
    }
    controlMoneyShop(parseInt(money.textContent))  
 }

 function clickTableMansion(){
    if (parseInt(money.textContent) >= parseInt(_PRICE[_DATA_MANSION].textContent)){
        if (parseInt(objectAmount[_DATA_MANSION].textContent) < _MAX_INSERT_IMAGE){
            const imgMansion = document.createElement("img")
            imgMansion.src = "../assets/img/hotel.png"
            _INSERT_IMAGE_BUY[_DATA_MANSION].appendChild(imgMansion)
        }
        fetch(`http://localhost:5000/create_property`,{
            method : "POST",
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'id_user': _ID,
                "id_property" : idProperty[_DATA_MANSION],
            })
        })
        money.textContent = parseInt(money.textContent) - parseInt(_PRICE[_DATA_MANSION].textContent)
        objectAmount[_DATA_MANSION].textContent = parseInt(objectAmount[_DATA_MANSION].textContent) + _AMOUNT
    }
    controlMoneyShop(parseInt(money.textContent))
    
 }