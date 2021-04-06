(() => {
    const socket = io();

    socket.on('sendData', (dataPlayer) => {
        let idJoueur = dataPlayer.id;
        console.log("IdPlayer = " + dataPlayer.id);

        if((idJoueur%2) == 0){
            temparray= [[2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2],
                        [3,3,1,1,3,3,1,1,3,3],
                        [3,3,1,1,3,3,1,1,3,3],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]];
                        sessionStorage.setItem('temparray', JSON.stringify(temparray));
                        sessionStorage.setItem('team', 1);
                        alert("Vous pouvez placer vos pions en bas");
        }
        else if((idJoueur%2) == 1){
            temparray= [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [3,3,1,1,3,3,1,1,3,3],
                        [3,3,1,1,3,3,1,1,3,3],
                        [2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2]];
                        sessionStorage.setItem('temparray', JSON.stringify(temparray));
                        sessionStorage.setItem('team', 2);
                        alert("Vous pouvez placer vos pions en haut");
        }

        socket.on('connectToRoom',function(data) {
            socket.emit('nameRoom', "GameRoom-"+data);
        });
    });
})();



myStorage = window.sessionStorage;

temparray = JSON.parse(sessionStorage.getItem('temparray'));

function allowDrop(ev) {
	ev.preventDefault();
}
  
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    coord=ev.target.id-1;
	let j=coord%10;
    let i=Math.trunc(coord/10);
    if(temparray[i][j]==0){
        ev.preventDefault();
	    var data = ev.dataTransfer.getData("text");
        var elem = document.getElementById(data);
	    ev.target.appendChild(elem);
        elem.setAttribute('draggable', false);
	    calcul_coord(ev.target.id,data);

        // TEST //
        //console.log(ev.target.id);
    }	
}

function calcul_coord(coord,data){
	coord=coord-1;
	let j=coord%10;
    let i=Math.trunc(coord/10);	
	temparray[i][j] = data;
    init_pion(i,j,data);
    sessionStorage.setItem('array', JSON.stringify(temparray));
    
    // TEST //
    //console.log(JSON.parse(sessionStorage.getItem('array')));
    //console.log(j);
    //console.log(i);
	//console.log(temparray[i][j]);
}

function init_pion(i,j,data){
	if(data == "Espion"){
		temparray[i][j] = new pion('Espion',1,sessionStorage.getItem('team'));
	}
    else if(data == "Eclaireur1" || data == "Eclaireur2" || data == "Eclaireur3" || data == "Eclaireur4" || data == "Eclaireur5" || data == "Eclaireur6" || data == "Eclaireur7" || data == "Eclaireur8"){
    	temparray[i][j] = new pion('Eclaireur',2,sessionStorage.getItem('team'));
    }
    else if(data == "Demineur1" || data == "Demineur2" || data == "Demineur3" || data == "Demineur4" || data == "Demineur5"){
    	temparray[i][j] = new pion('Demineur',3,sessionStorage.getItem('team'));
    }
    else if(data == "Sergent1" || data == "Sergent2" || data == "Sergent3" || data == "Sergent4"){
    	temparray[i][j] = new pion('Sergent',4,sessionStorage.getItem('team'));
    }    
    else if(data == "Lieutenant1" || data == "Lieutenant2" || data == "Lieutenant3" || data == "Lieutenant4"){
    	temparray[i][j] = new pion('Lieutenant',5,sessionStorage.getItem('team'));
    }          
    else if(data == "Capitaine1" || data == "Capitaine2" || data == "Capitaine3" || data == "Capitaine4"){
    	temparray[i][j] = new pion('Capitaine',6,sessionStorage.getItem('team'));	
    }       
    else if(data == "Commandant1" || data == "Commandant2" || data == "Commandant3"){
    	temparray[i][j] = new pion('Commandant',7,sessionStorage.getItem('team'));	
    }      
    else if(data == "Colonel1" || data == "Colonel2"){
    	temparray[i][j] = new pion('Colonel',8,sessionStorage.getItem('team'));
    }            
    else if(data == "General"){
    	temparray[i][j] = new pion('General',9,sessionStorage.getItem('team'));	
    }            
    else if(data == "Marechal"){
    	temparray[i][j] = new pion('Marechal',10,sessionStorage.getItem('team'));	
    }        
    else if(data == "Drapeau"){
    	temparray[i][j] = new pion('Drapeau',0,sessionStorage.getItem('team'));	
    }
    else if(data == "Bombes1" || data == "Bombes2" || data == "Bombes3" || data == "Bombes4" || data == "Bombes5" || data == "Bombes6"){
    	temparray[i][j] = new pion('Bombes',100,sessionStorage.getItem('team'));
    }          
}

function ready(){
    (() => {
        const socket = io();
            if(sessionStorage.getItem('team') == 1){
                socket.emit('array1', (sessionStorage.getItem('array')));
                socket.emit('Rdy1', 1);
                console.log('ok team 1');
            }

            if(sessionStorage.getItem('team') == 2){
                socket.emit('array2', (sessionStorage.getItem('array')));
                socket.emit('Rdy2', 1);
                console.log('ok team 2');
            };

            socket.emit('finalarray');
 })();       

 (() => {
        const socket = io();
        socket.on('finalarray', (array) => {
            sessionStorage.setItem('tabl', JSON.stringify(array));
        });

        socket.on('redirect', function(destination) {
        window.location.href = destination;
});
})();       

}