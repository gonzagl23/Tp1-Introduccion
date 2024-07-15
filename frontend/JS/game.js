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
    _MAX_INSERT_IMAGE = 10,
    _AMOUNT = 1,
    _SRC_IMG_WORK = "../assets/img/obrero.png",
    _SRC_IMG_HOUSE = "../assets/img/hogar.png",
    _SRC_IMG_DEPARTAMENT = "../assets/img/departamento.png",
    _SRC_IMG_MANSION = "../assets/img/hotel.png",
    _CLICKER_IMAGE = document.getElementById("img-click"),
    _INSERT_IMAGE_BUY = document.querySelectorAll(".buy-box"),
    _TABLE_BUY = document.querySelectorAll(".shop"),
    _TITLE_SHOP = document.querySelectorAll(".title"),
    _ID = new URLSearchParams(window.location.search).get('id'),
    _BTN_SIGNOUT = document.getElementById("sign-out"),
    _TITLE_PROPERTY_BUY = document.querySelectorAll(".property-buy"),
    _PRICE = document.querySelectorAll(".price"),
    _PROFIT = document.querySelectorAll('.profit'),
    _DESCRIPTION_TABLE = document.querySelectorAll(".description-table"),
    _COLLECT_WORKER = document.getElementById('worker-collect'),
    _COLLECT_HOUSE = document.getElementById('house-collect'),
    _COLLECT_DEPARTAMENT = document.getElementById('departament-collect'),
    _COLLECT_MANSION = document.getElementById('mansion-collect')



    // ----------------SIGNOUT USER----------------- //  
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
            money: parseInt(money.textContent),
        })
    }).then(content => content.json())
    .then(data => console.log(data))
    .catch(errorData)
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


//------------- GET DATA TABLE INFORMATION------------------------//
fetch("http://localhost:5000/information_table/")
.then(response => response.json())
.then(getDataTable)
.catch(error => console.log(`error,${error}`))

function getDataTable(content){
    for (i = 0; i < content.length ; i ++){
        _TITLE_SHOP[i].textContent = content[i].category
        _TITLE_PROPERTY_BUY[i].textContent = content[i].category,
        _PRICE[i].textContent = content[i].cost_property,
        _PROFIT[i].textContent =  content[i].profits
        idProperty.push(content[i].id)
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



// ------------------GET OBJECTS BUY ---------------------// 
fetch(`http://localhost:5000/property_buy/${_ID}`)
.then(response => response.json())
.then(getDataObjectBuy)
.catch(errorData)


function getDataObjectBuy(content){
    for (i = 0 ;i < content.length ; i ++){
        const img = document.createElement('img')
        if (content[i].id_property_type ===  idProperty[_DATA_WORKER]){
            if (parseInt(objectAmount[_DATA_WORKER].textContent) < _MAX_INSERT_IMAGE){
                img.src = _SRC_IMG_WORK
                if (content[i].state === true){
                    img.classList.add('worker-buy')
                    _COLLECT_WORKER.classList.add('activate')
                }
                _INSERT_IMAGE_BUY[_DATA_WORKER].appendChild(img)
            }
            objectAmount[_DATA_WORKER].textContent = parseInt(objectAmount[_DATA_WORKER].textContent) + _AMOUNT
        }else if (content[i].id_property_type ===  idProperty[_DATA_HOUSE]){
            if (parseInt(objectAmount[_DATA_HOUSE].textContent) < _MAX_INSERT_IMAGE){
                img.src = _SRC_IMG_HOUSE
                if (content[i].state === true){
                    img.classList.add('house-buy')
                    _COLLECT_HOUSE.classList.add("activate")
                }
                _INSERT_IMAGE_BUY[_DATA_HOUSE].appendChild(img)
            }
            objectAmount[_DATA_HOUSE].textContent = parseInt(objectAmount[_DATA_HOUSE].textContent) + _AMOUNT

        }else if (content[i].id_property_type ===  idProperty[_DATA_DEPARTAMENT]){
            if (parseInt(objectAmount[_DATA_DEPARTAMENT].textContent) < _MAX_INSERT_IMAGE){
                img.src = _SRC_IMG_DEPARTAMENT
                if (content[i].state === true){
                    img.classList.add('departament-buy')
                    _COLLECT_DEPARTAMENT.classList.add("activate")
                }
                _INSERT_IMAGE_BUY[_DATA_DEPARTAMENT].appendChild(img)
            }
            objectAmount[_DATA_DEPARTAMENT].textContent = parseInt(objectAmount[_DATA_DEPARTAMENT].textContent) + _AMOUNT

        }else if (content[i].id_property_type ===  idProperty[_DATA_MANSION]){
            if (parseInt(objectAmount[_DATA_MANSION].textContent) < _MAX_INSERT_IMAGE){
                img.src = _SRC_IMG_MANSION
                if (content[i].state === true){
                    img.classList.add('mansion-buy')
                    _COLLECT_MANSION.classList.add("activate")
                }
                _INSERT_IMAGE_BUY[_DATA_MANSION].appendChild(img)
            }
            objectAmount[_DATA_MANSION].textContent = parseInt(objectAmount[_DATA_MANSION].textContent) + _AMOUNT

        }
    }
}



// ------------------- COLLECT BUYS-------------------------------//

_COLLECT_WORKER.addEventListener('click',()=>{
    collectObject(objectAmount[_DATA_WORKER],idProperty[_DATA_WORKER],_PROFIT[_DATA_WORKER],document.querySelectorAll(".worker-buy"),_COLLECT_WORKER)
})
_COLLECT_HOUSE.addEventListener('click',()=>{
    collectObject(objectAmount[_DATA_HOUSE],idProperty[_DATA_HOUSE],_PROFIT[_DATA_HOUSE],document.querySelectorAll(".house-buy"),_COLLECT_HOUSE)
})
_COLLECT_DEPARTAMENT.addEventListener('click',()=>{
    collectObject(objectAmount[_DATA_DEPARTAMENT],idProperty[_DATA_DEPARTAMENT],_PROFIT[_DATA_DEPARTAMENT],document.querySelectorAll(".departament-buy"),_COLLECT_DEPARTAMENT)
})
_COLLECT_MANSION.addEventListener('click',()=> {
    collectObject(objectAmount[_DATA_MANSION],idProperty[_DATA_MANSION],_PROFIT[_DATA_MANSION],document.querySelectorAll(".mansion-buy"),_COLLECT_MANSION)
})


function collectObject(amount,propertyId,profit,imgAmount,collect){
    for (i = 0 ; i < imgAmount.length ; i++){
        imgAmount[i].remove()
    }
    fetch(`http://localhost:5000/delete_property/${_ID}/property_id/${propertyId}`,{
        method : "DELETE",
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        money.textContent = parseInt(money.textContent) + (data.message * parseInt(profit.textContent))
        amount.textContent = parseInt(amount.textContent) - data.message
        collect.classList.remove('activate')
        controlMoneyShop(parseInt(money.textContent))
    })
    .catch(error => console.log(error))
    
}


//-------------------- TABLE SHOP---------------------//
_TABLE_BUY[_DATA_WORKER].addEventListener('click',()=>{
    clickTable(_PRICE[_DATA_WORKER],objectAmount[_DATA_WORKER],idProperty[_DATA_WORKER],_SRC_IMG_WORK,_INSERT_IMAGE_BUY[_DATA_WORKER])
})
_TABLE_BUY[_DATA_HOUSE].addEventListener('click',()=>{
    clickTable(_PRICE[_DATA_HOUSE],objectAmount[_DATA_HOUSE],idProperty[_DATA_HOUSE],_SRC_IMG_HOUSE,_INSERT_IMAGE_BUY[_DATA_HOUSE])
})
_TABLE_BUY[_DATA_DEPARTAMENT].addEventListener('click',()=>{
    clickTable(_PRICE[_DATA_DEPARTAMENT],objectAmount[_DATA_DEPARTAMENT],idProperty[_DATA_DEPARTAMENT],_SRC_IMG_DEPARTAMENT,_INSERT_IMAGE_BUY[_DATA_DEPARTAMENT])
})
_TABLE_BUY[_DATA_MANSION].addEventListener('click',()=>{
    clickTable(_PRICE[_DATA_MANSION],objectAmount[_DATA_MANSION],idProperty[_DATA_MANSION],_SRC_IMG_MANSION,_INSERT_IMAGE_BUY[_DATA_MANSION])
})

function clickTable(price,amount,propertyId,srcImage,listImageInsert){
    if (parseInt(money.textContent) >= parseInt(price.textContent)){
        if (parseInt(amount.textContent) < _MAX_INSERT_IMAGE){
            const img = document.createElement('img')
            img.src = srcImage
            listImageInsert.appendChild(img)
        }
        fetch(`http://localhost:5000/create_property`,{
            method : "POST",
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'id_user': _ID,
                "id_property" : propertyId
            })
        })
        money.textContent = parseInt(money.textContent) - parseInt(price.textContent)
        amount.textContent = parseInt(amount.textContent) + _AMOUNT
        controlMoneyShop(parseInt(money.textContent))
    }
}


// ----- UPDATE USER ----//
window.addEventListener("beforeunload",()=>{
    updateUser()
})