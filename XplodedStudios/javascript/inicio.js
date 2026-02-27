//Esta función consigue los datos del json de juegos.
async function getGames() { 
    const url = "./m/json/juegos.json"; //ruta del json de juegos
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




//Esta función se ejecuta al crearse la pagina
window.onload = async function () {
    const data = await getGames();
    if (!data) return;
    // Contadores para limitar a 10 juegos por sección
    let countNew = 1;
    let countRpg = 1;
    let gamesMitad = Math.ceil(data.juegos.length/2)
    // Columnas de las listas
    let column1 = document.getElementsByClassName("column1-gamelist");
    let column2 = document.getElementsByClassName("column2-gamelist");
    let colunm1U = document.getElementsByClassName("column1-gamelist-unlimited");
    let colunm2U = document.getElementsByClassName("column2-gamelist-unlimited");
    // Listas de juegos
    data.juegos.forEach((game, index) => {
        // Juegos nuevos
        if (game.tags.includes("new")) {
            if (countNew <= 5 && column1[0]) {
                column1[0].insertAdjacentHTML("beforeend", createGameCard(game));
                countNew++;
            }
            else if (countNew <= 10 && column2[0]) {
                column2[0].insertAdjacentHTML("beforeend", createGameCard(game));
                countNew++;
            }
        }
        // Juegos RPG
        if (game.tags.includes("rpg")) {
            if (countRpg <= 5 && column1[1]) {
                column1[1].insertAdjacentHTML("beforeend", createGameCard(game));
                countRpg++;
            }
            else if (countRpg <= 10 && column2[1]) {
                column2[1].insertAdjacentHTML("beforeend", createGameCard(game));
                countRpg++;
            }
        }

        if( index < (gamesMitad) ){
            if (colunm1U[0]) {
                colunm1U[0].insertAdjacentHTML("beforeend", createGameCard(game));
            }
        } else{
            if (colunm2U[0]) {
                colunm2U[0].insertAdjacentHTML("beforeend", createGameCard(game));
            }
        }
    });
    // Juegos premiados
    const awardedGames = data.juegos.filter(game => game.award != null);
    // Cuenta de juegos premiados (tambien para q no se repitan en los dos contenedores)
    const firstAwards = awardedGames.slice(0, 3);
    const secondAwards = awardedGames.slice(3, 6);
    // Contenedores de juegos destacados
    let gameA1 = document.getElementsByClassName("option1-gameawarded");
    let gameA2 = document.getElementsByClassName("option2-gameawarded");
    let gameA3 = document.getElementsByClassName("option3-gameawarded");
    // Primer contenedor
    firstAwards.forEach((game, index) => {
        if (index === 0 && gameA1[0])
            gameA1[0].insertAdjacentHTML("beforeend", createAwardedCard(game));

        if (index === 1 && gameA2[0])
            gameA2[0].insertAdjacentHTML("beforeend", createAwardedCard(game));

        if (index === 2 && gameA3[0])
            gameA3[0].insertAdjacentHTML("beforeend", createAwardedCard(game));
    });
    // Segundo contenedor
    firstAwards.length >= 3 && secondAwards.forEach((game, index) => {
        if (index === 0 && gameA1[1])
            gameA1[1].insertAdjacentHTML("beforeend", createAwardedCard(game));

        if (index === 1 && gameA2[1])
            gameA2[1].insertAdjacentHTML("beforeend", createAwardedCard(game));

        if (index === 2 && gameA3[1])
            gameA3[1].insertAdjacentHTML("beforeend", createAwardedCard(game));
    });
    // Botoncitos del carousel de cada contenedor de juegos destacados
    const containers = document.querySelectorAll('.gameawarded-container');
    containers.forEach(container => {
        const highlight = container.querySelector('.gameawarded-div');
        const prevBtn = container.querySelector('.carousel-btn.left');
        const nextBtn = container.querySelector('.carousel-btn.right');
        if (!highlight || !prevBtn || !nextBtn) return;
        // Mostrar el siguiente o anterior juego destacado (solo en este contenedor)
        const slideWidth = () => highlight.clientWidth;
        prevBtn.addEventListener('click', () => {
            highlight.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            highlight.scrollBy({ left: slideWidth(), behavior: 'smooth' });
        });
        // Habilitar/deshabilitar botones en los extremos del carrusel
        const updateButtons = () => {
            prevBtn.disabled = highlight.scrollLeft <= 0;
            nextBtn.disabled = Math.ceil(highlight.scrollLeft + highlight.clientWidth) >= highlight.scrollWidth;
        };
        highlight.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        // estado inicial
        updateButtons();
    });
    // Juegos destacados
    // Contenedores de juegos destacados
    let gameH = document.getElementsByClassName("gamehighlight");
    data.juegos.forEach(game => {
        if (game.tags.includes("recommended") && gameH[0]) {
            gameH[0].insertAdjacentHTML("beforeend", createHighlightCard(game));
        }
    });

    // Cargar juegos del carrito en el popup
    let cartG = getCart();
    cartG.juegos.forEach(game => {
        document.getElementById("cart").insertAdjacentHTML("beforeend", `
            <div class="cart-game">
                <div class="game-img">
                    <img src="${game.imagen}">
                </div>
                <h6 class="game-title">${game.nombre}</h6>
                <h6 class="game-price">${game.precio}$</h6>
            </div>`
        );
    });
    console.log('Cart functionality not available');
    
}
// Crear las cartas de las listas
function createGameCard(game) {
    return `
        <div class="game" onclick="enviar(${game.id})">
            <div class="game-img">
                <img src="${game.imagen}">
            </div>
            <h3 class="game-title">${game.nombre}</h3>
            <h3 class="game-price">$${game.precio}$</h3>
        </div>
    `;
}
// Crear las cartas de los juegos premiados
function createAwardedCard(game) {
    return `
        <div class="gameA">
            <div class="gameA-img">
                <img src="${game.imagen}">
            </div>
            <div class="gameA-info">
                <p class="gameA-award">${game.award}</p>
                <h3 class="gameA-title">${game.nombre}</h3>
                <p class="gameA-description">${game.descripcion}</p>
                <button id="gameA-button" class="comprar-btn" onclick="enviar(${game.id})">Ver más</button>
            </div>
        </div>
    `;
}
// Crear las cartas de los juegos destacados
function createHighlightCard(game) {
    return `
        <div class="gameH">
            <img class="gameH-img" src="${game.imagen}" alt="${game.nombre}">
            <p class="gameH-title">${game.nombre}</p>
            <p class="gameH-price">$${game.precio}</p>
            <button id="gameH-btn" class="comprar-btn" onclick="enviar(${game.id})">Ver más</button>
        </div>
    `;
}

/* cartG.juegos.forEach(game => {
        document.getElementById("cart").insertAdjacentElement("beforeend", `<div class="cart-game">
                            <div class="game-img">
                                <img src="${game.imagen}">
                            </div>
                            <h6 class="game-title">${game.nombre}</h6>
                            <h6 class="game-price">${game.precio}$</h6>
                        </div>`

        )
    });*/


function enviar(idSelec) { // Envia el juego y abre detalles con el juego correcto
    window.location.href = `../html/detalles.html?id=${idSelec}`;
}

