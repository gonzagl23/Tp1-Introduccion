
let 
    counter = document.querySelector(".counter"),
    countWorker = 1
    buyWorker = document.getElementById("buy-worker"),
    buyHouse = document.getElementById("buy-house"),
    buyDepartament = document.getElementById("buy-departament"),
    buyMansion = document.getElementById("buy-mansion")

const 
    _DATA_WORKER = 0,
    _DATA_HOUSE = 1,
    _DATA_DEPARTAMENT = 2,
    _DATA_MANSION = 3,
    _CLICKER_IMAGE = document.getElementById("img-click"),
    _AMOUNT = 1,
    _DOUBLE_PRICE = 2,
    _INSERT_IMAGE_WORKER =  document.getElementById("insert-worker"),
    _INSERT_IMAGE_HOUSE = document.getElementById("insert-house"),
    _INSERT_IMAGE_DEPARTAMENT = document.getElementById("insert-departament"),
    _INSERT_IMAGE_MANSION = document.getElementById("insert-mansion")

const data = [{
    table : document.getElementById("table-worker"),
    title : document.getElementById("title-worker"),
    description: document.getElementById("description-worker"),
    price: document.getElementById("price-worker"),
    },{
    table: document.getElementById("table-house"),
    title:document.getElementById("title-house"),
    description: document.getElementById("description-house"),
    price : document.getElementById("price-house"),
    },{
    table: document.getElementById("table-departament"),
    title: document.getElementById("title-departament"),
    description : document.getElementById("description-departament"),
    price: document.getElementById("price-departament"),

    },{
    table: document.getElementById("table-mansion"),
    title: document.getElementById("title-mansion"),
    description: document.getElementById("description-mansion"),
    price: document.getElementById("price-mansion"),
    }]    


_CLICKER_IMAGE.addEventListener('click',clickerImage)


data[_DATA_WORKER].table.addEventListener('click',clickTableWorker)
data[_DATA_HOUSE].table.addEventListener('click',clickTableHouse)
data[_DATA_DEPARTAMENT].table.addEventListener('click',clickTableDepartament)
data[_DATA_MANSION].table.addEventListener('click',clickTableMansion)


function clickerImage(){
    _CLICKER_IMAGE.classList.toggle("activate")    
    setTimeout(function(){
        _CLICKER_IMAGE.classList.toggle("activate")
    },90)
    counter.textContent = parseInt(counter.textContent) + countWorker
    moneyShop(parseInt(counter.textContent))
}


function moneyShop(money){
    if (money >= parseInt(data[_DATA_WORKER].price.textContent)){
        data[_DATA_WORKER].table.classList.add("activate")
        data[_DATA_WORKER].title.classList.add("activate")
        data[_DATA_WORKER].description.classList.add("activate")
        data[_DATA_WORKER].price.classList.add("activate")
    }
    if (money >= parseInt(data[_DATA_HOUSE].price.textContent)){
        data[_DATA_HOUSE].table.classList.add("activate")
        data[_DATA_HOUSE].title.classList.add("activate")
        data[_DATA_HOUSE].description.classList.add("activate")
        data[_DATA_HOUSE].price.classList.add("activate")
    }
    if (money >= parseInt(data[_DATA_DEPARTAMENT].price.textContent)){
        data[_DATA_DEPARTAMENT].table.classList.add("activate")
        data[_DATA_DEPARTAMENT].title.classList.add("activate")
        data[_DATA_DEPARTAMENT].description.classList.add("activate")
        data[_DATA_DEPARTAMENT].price.classList.add("activate")
    }
    if (money >= parseInt(data[_DATA_MANSION].price.textContent)){
        data[_DATA_MANSION].table.classList.add("activate")
        data[_DATA_MANSION].title.classList.add("activate")
        data[_DATA_MANSION].description.classList.add("activate")
        data[_DATA_MANSION].price.classList.add("activate")
    }
    
}

function clickTableWorker(){
   if (parseInt(counter.textContent) >= parseInt(data[_DATA_WORKER].price.textContent)){
        data[_DATA_WORKER].price.textContent = parseInt(data[_DATA_WORKER].price.textContent) * _DOUBLE_PRICE
        countWorker = countWorker + _AMOUNT
        const imgWorker = document.createElement("img")
        imgWorker.src = "../assets/img/obrero.png"
        imgWorker.width = 50
        imgWorker.height = 50
        _INSERT_IMAGE_WORKER.appendChild(imgWorker)
        buyWorker.textContent = parseInt(buyWorker.textContent) + _AMOUNT
   }
   if (parseInt(counter.textContent) < parseInt(data[_DATA_WORKER].price.textContent)){
        data[_DATA_WORKER].table.classList.remove("activate")
        data[_DATA_WORKER].title.classList.remove("activate")
        data[_DATA_WORKER].description.classList.remove("activate")
        data[_DATA_WORKER].price.classList.remove("activate")
   }
}

function clickTableHouse(){
    if (parseInt(counter.textContent) >= parseInt(data[_DATA_HOUSE].price.textContent)){
        data[_DATA_HOUSE].price.textContent = parseInt(data[_DATA_HOUSE].price.textContent) * _DOUBLE_PRICE
        const imgHouse = document.createElement("img")
        imgHouse.src = "../assets/img/hogar.png"
        imgHouse.width = 50
        imgHouse.height = 50
        _INSERT_IMAGE_HOUSE.appendChild(imgHouse)
        buyHouse.textContent = parseInt(buyHouse.textContent) + _AMOUNT
    }
    if (parseInt(counter.textContent) < parseInt(data[_DATA_HOUSE].price.textContent)){
         data[_DATA_HOUSE].table.classList.remove("activate")
         data[_DATA_HOUSE].title.classList.remove("activate")
         data[_DATA_HOUSE].description.classList.remove("activate")
         data[_DATA_HOUSE].price.classList.remove("activate")
    }
 }

 function clickTableDepartament(){
    if (parseInt(counter.textContent) >= parseInt(data[_DATA_DEPARTAMENT].price.textContent)){
        data[_DATA_DEPARTAMENT].price.textContent = parseInt(data[_DATA_DEPARTAMENT].price.textContent) * _DOUBLE_PRICE
        const imgDepartament = document.createElement("img")
        imgDepartament.src = "../assets/img/departamento.png"
        imgDepartament.width = 50
        imgDepartament.height = 50
        _INSERT_IMAGE_DEPARTAMENT.appendChild(imgDepartament)
        buyDepartament.textContent = parseInt(buyDepartament.textContent) + _AMOUNT
    }
    if (parseInt(counter.textContent) < parseInt(data[_DATA_DEPARTAMENT].price.textContent)){
        data[_DATA_DEPARTAMENT].table.classList.remove("activate")
        data[_DATA_DEPARTAMENT].title.classList.remove("activate")
        data[_DATA_DEPARTAMENT].description.classList.remove("activate")
        data[_DATA_DEPARTAMENT].price.classList.remove("activate")
    }
 }

 function clickTableMansion(){
    if (parseInt(counter.textContent) >= parseInt(data[_DATA_MANSION].price.textContent)){
        data[_DATA_MANSION].price.textContent = parseInt(data[_DATA_MANSION].price.textContent) * _DOUBLE_PRICE
        const imgMansion = document.createElement("img")
        imgMansion.src = "../assets/img/hotel.png"
        imgMansion.width = 50
        imgMansion.height = 50
        _INSERT_IMAGE_MANSION.appendChild(imgMansion)
        buyMansion.textContent = parseInt(buyMansion.textContent) + _AMOUNT
    }
    if (parseInt(counter.textContent) < parseInt(data[_DATA_MANSION].price.textContent)){
        data[_DATA_MANSION].table.classList.remove("activate")
        data[_DATA_MANSION].title.classList.remove("activate")
        data[_DATA_MANSION].description.classList.remove("activate")
        data[_DATA_MANSION].price.classList.remove("activate")
    }
 }