let currentGame = null;


async function getGames() { 
    const url = "../m/json/juegos.json"; //ruta del json de juegos
    try{
        const response = await fetch(url); //fetch de los datos
        if(!response.ok){
            throw new Error('Response status: '+response.status)
        } else{
            const data = await response.json();
            return data; //Retorno de datos
        }
    } catch (error){
        console.error(error);
    }
}

function addToCart() {
    if (!currentGame) return;
    let cartData = getCart();
    cartData.juegos.push(currentGame);
    localStorage.setItem("carrito", JSON.stringify(cartData));
    window.location.href = "../index.html";
}

window.onload = async function () {
    let games = await getGames();
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    games.juegos.forEach(game => {
        if (game.id === id) {
            document.querySelector("main").innerHTML = `
                <div class="izq">
                    <h1>${game.nombre}</h1>
                    <p class="precio">$${game.precio} USD</p>
                    <button onclick="addToCart()" class="boton">COMPRAR AHORA</button>
                    <p class="descripcion">${game.descripcion}</p>
                </div>
                <div class="der">
                    <img src="${game.imagen}" alt="Imagen de ${game.nombre}">
                </div>
            `;
            currentGame = game;
        }
    });
    let cartG = await getCart();
    cartG.juegos.forEach(game => {
        document.getElementById("cart").insertAdjacentHTML("beforeend", `
            <div class="cart-game" id="${game.id}">
                <div class="game-img">
                    <img src="${game.imagen}">
                </div>
                <h6 class="game-title">${game.nombre}</h6>
                <h6 class="game-price">${game.precio}$</h6>
            </div>`

        )
    });
};
