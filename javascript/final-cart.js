function getCart() { //Pasó a local storage
    const carrito = localStorage.getItem("carrito"); //Busca el item carrito
    if (carrito) {
        return JSON.parse(carrito);
    } else {
        return { juegos: [] };
    }
}
function cart(){ //Carrito load
    let cartG = getCart();
    if(cartG.juegos.length === 0){
        document.getElementById("defaulttext").style.visibility = "visible";
        document.getElementById("defaulttext").style.display = "block";
        document.getElementById("cartGamesIncluded").style.display = "block";
    }
}

function loadCart(){
    document.getElementById("cartGamesIncluded").innerHTML = `<h3 id="defaulttext">No Games In Cart</h3>`
    cart();
    let cartG = getCart();
    let total = 0;
    cartG.juegos.forEach(game => {
        document.getElementById("cartGamesIncluded").insertAdjacentHTML("beforeend", `
            <div class="cart-game" id="${game.id}">
                <div class="game-img">
                    <img src="${game.imagen}">
                </div>
                <h6 class="game-title">${game.nombre}</h6>
                <i class="fa-solid fa-trash" onclick="deleteGame(${game.id})"></i>
                <h6 class="game-price">${game.precio}$</h6>
            </div>`
        )
        total += Number(game.precio);
    });
    document.getElementById("precioTotal").innerText = `Total: ${total.toFixed(2)} $`;
}
function deleteGame(gameid){
    let cartG = getCart();
    const index = cartG.juegos.findIndex(game => game.id === gameid);

    if (index !== -1) {
        cartG.juegos.splice(index, 1);
    }

    localStorage.setItem('carrito', JSON.stringify(cartG));
    loadCart();
}
function pay(){
    let cartG = getCart();
    if(cartG.juegos.length === 0){
        alert("You must at least buy 1 game.")
    } else {
        localStorage.removeItem("carrito");
        alert("Payment method Succesul!")
        window.location.href = "../index.html";    }
}
window.onload = function (){
    loadCart();
}
