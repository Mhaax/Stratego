(function() {
	let a = new game();
})();

let chatForm = document.getElementById('chatForm');
let inputMessage = document.getElementById('input');
let Espion1=Espion2=1;
let Eclaireur1=Eclaireur2=8;
let Demineur1=Demineur2=5;
let Sergent1=Sergent2=4;
let Lieutenant1=Lieutenant2=4;
let Capitaine1=Capitaine2=4
let Commandant1=Commandant2=3;
let Colonel1=Colonel2=2;
let General1=General2=1
let Marechal1=Marechal2=1;
let Bombe1=Bombe2=6;

(() => {
        const socket = io();
// Avertis socket io de l'arrivée dans le chat d'un user
socket.emit('login', '');

// Gestion de l'envoi d'un message
chatForm.addEventListener('submit', event => {
    event.preventDefault(); //remember
    if (input.value) {
        socket.emit('message', inputMessage.value);
        inputMessage.value = '';
    }
});

// Affichage d'un message
socket.on('new-message', msg => {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
});
})(); 
