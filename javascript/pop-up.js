const showPopup = document.querySelector('.show-popup');   
const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.close-btn');
const sendBtn = document.querySelector('.send-btn');

showPopup.onclick = () => {
    popupContainer.classList.add('active');
}

closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}
sendBtn.onclick = () => {

    let messageText = document.getElementById('comentario');
    messageText.value = '';
    let phoneText = document.getElementById('tel-texto');
    phoneText.value = '';
    let mailText = document.getElementById('correo-texto');
    mailText.value = '';
    let nameText = document.getElementById('nombre-texto');
    nameText.value = '';
    let lstText = document.getElementById('apell-texto');
    lstText.value = '';
    popupContainer.classList.remove('active');
}