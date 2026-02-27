
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
    }
    document.getElementById("cart").style.visibility = "visible";
    
}
function no_cart(){
    document.getElementById("defaulttext").style.visibility = "hidden";
    document.getElementById("cart").style.visibility = "hidden";
}