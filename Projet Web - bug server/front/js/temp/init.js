temparray= [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,1,1,0,0],
            [0,0,1,1,0,0,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]];


myStorage = window.sessionStorage;

//DELIMITER ZONE DE PLACEMENT EN FONCTION DU JOUEUR
//SWAP LA PIECE SI ON LA REMPLACE
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
		temparray[i][j] = new pion('Espion',1,0);
	}
    else if(data == "Eclaireur1" || data == "Eclaireur2" || data == "Eclaireur3" || data == "Eclaireur4" || data == "Eclaireur5" || data == "Eclaireur6" || data == "Eclaireur7" || data == "Eclaireur8"){
    	temparray[i][j] = new pion('Eclaireur',2,0);
    }
    else if(data == "Demineur1" || data == "Demineur2" || data == "Demineur3" || data == "Demineur4" || data == "Demineur5"){
    	temparray[i][j] = new pion('Demineur',3,0);
    }
    else if(data == "Sergent1" || data == "Sergent2" || data == "Sergent3" || data == "Sergent4"){
    	temparray[i][j] = new pion('Sergent',4,0);
    }    
    else if(data == "Lieutenant1" || data == "Lieutenant2" || data == "Lieutenant3" || data == "Lieutenant4"){
    	temparray[i][j] = new pion('Lieutenant',5,0);
    }          
    else if(data == "Capitaine1" || data == "Capitaine2" || data == "Capitaine3" || data == "Capitaine4"){
    	temparray[i][j] = new pion('Capitaine',6,0);	
    }       
    else if(data == "Commandant1" || data == "Commandant2" || data == "Commandant3"){
    	temparray[i][j] = new pion('Commandant',7,0);	
    }      
    else if(data == "Colonel1" || data == "Colonel2"){
    	temparray[i][j] = new pion('Colonel',8,0);
    }            
    else if(data == "General"){
    	temparray[i][j] = new pion('General',9,0);	
    }            
    else if(data == "Marechal"){
    	temparray[i][j] = new pion('Marechal',10,0);	
    }        
    else if(data == "Drapeau"){
    	temparray[i][j] = new pion('Drapeau',0,0);	
    }
    else if(data == "Bombes1" || data == "Bombes2" || data == "Bombes3" || data == "Bombes4" || data == "Bombes5" || data == "Bombes6"){
    	temparray[i][j] = new pion('Bombes',100,0);
    }          
}


class Init_board{
	constructor(array){
		this.setArray(array);
        this.getArray();
        
        // TEST //
        //console.log(this.array);
	}

    setArray(array){
        this.array = array;
    }

    getArray(){
        return this.array;
    }
}

class Init extends Init_board{
    constructor(){
        super();
        let Init_array = new Init_board(JSON.parse(sessionStorage.getItem('array')));
        this.array = Init_array.getArray();
        // TEST //
        //console.log(this.array);
    }
}

function ready(){
	//let a = new Init_board(temparray);
    document.location.href="game.html";
	//let isReady = true;
	/*
	if joueur 1 is ready et joueur 2 is ready FAIRE page game*/
	//console.log(temparray);
}
