class game{
    constructor(){
        this.listeners();
        this.strategoTab = sessionStorage.getItem('tabl');
        this.turn=1;
        console.log(this.strategoTab);
        this.display();
    }

    display(){
            let tabl = document.getElementById("tab");
            for(let i = 0; i < 10; i++){
                for(let j = 0; j < 10; j++){
                    if (this.strategoTab[i][j] == 0 || this.strategoTab[i][j] == 1){
                      tabl.rows[i].cells[j].innerText = this.strategoTab[i][j];
                      if (tabl.rows[i].cells[j].innerText == 0) {
                          tabl.rows[i].cells[j].innerHTML="<img src='image/0.png'/>";
                      }
                      if (tabl.rows[i].cells[j].innerText == 1){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/1.jpg'/>";
                      }
                       
                    }
                    else{
                        tabl.rows[i].cells[j].innerText = this.strategoTab[i][j].name;
                        if (tabl.rows[i].cells[j].innerText == "Espion"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/Esp.png'/>";
                        }
                        if (tabl.rows[i].cells[j].innerText == "Eclaireur"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/Ecl.png'/>";
                        }
                        if (tabl.rows[i].cells[j].innerText == "Demineur"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/De.png'/>";
                        }
                        if (tabl.rows[i].cells[j].innerText == "Sergent"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/S.png'/>";
                        }
                        if (tabl.rows[i].cells[j].innerText == "Capitaine"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/Cap.png'/>";
                        }
                        if (tabl.rows[i].cells[j].innerText == "Lieutenant"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/L.png'/>";
                        } 
                        if (tabl.rows[i].cells[j].innerText == "Commandant"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/Com.png'/>";
                        } 
                        if (tabl.rows[i].cells[j].innerText == "Colonel"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/C.png'/>";
                        } 
                        if (tabl.rows[i].cells[j].innerText == "General"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/G.png'/>";
                        } 
                        if (tabl.rows[i].cells[j].innerText == "Marechal"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/M.png'/>";
                        } 
                        if (tabl.rows[i].cells[j].innerText == "Bombes"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/B.gif'/>";
                        } 
                        if (tabl.rows[i].cells[j].innerText == "Drapeau"){
                          tabl.rows[i].cells[j].innerHTML="<img src='image/D.png'/>";
                        } 
                    }
                }
            }
        }

    listeners() { //Détecte le premier clique
            let tabl = document.getElementById("tab");
            let pion;
            
            //if(this.turn==sessionStorage.getItem("team")){
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10; j++) {
                        tabl.rows[i].cells[j].addEventListener('click', () => {
                                if(pion){ // et que 
                                    if((i==pion[0]+1&&j==pion[1])||(i==pion[0]-1&&j==pion[1])||(i==pion[0]&&j==pion[1]+1)||(i==pion[0]&&j==pion[1]-1)){
                                        if(this.strategoTab[i][j] == 0){
                                            console.log("2e clique");
                                            this.strategoTab[i][j] = this.strategoTab[pion[0]][pion[1]];
                                            this.strategoTab[pion[0]][pion[1]] = 0;
                                            this.display();
                                            /*if(this.turn==1){this.turn=2;}
                                            else{this.turn=1;}*/
                                            pion = null;
                                        }
                                        else if(this.strategoTab[i][j] == 1){ // || this.strategoTab[i][j] == 'P'){
                                            alert("Vous ne pouvez pas aller ici");
                                            pion = null;
                                        }
                                        else{
                                            /*if(this.strategoTab[i][j].team==this.strategoTab[pion[0]][pion[1]].team){
                                                alert("Vous ne pouvez pas déplacer ce pion ici");
                                            }
                                            else{
                                                this.take_pion(i,j,pion[0],pion[1]);
                                            }*/
                                            this.take_pion(pion[0],pion[1],i,j);
                                            /*if(this.turn==1){this.turn=2;}
                                            else{this.turn=1;}*/
                                            
                                            pion=null;
                                        }
                                    }
                                    else{
                                        alert("Cette case est trop lointaine votre pion n'est pas dans une voiture");
                                        pion=null;
                                    }
                                    
                                    /*else if(this.strategoTab[i][j] == pion){
                                        SI pion.team = pion.team FAIRE
                                        vous ne pouvez pas déplacer le pion ici
                                        SINON FAIRE
                                        take_pion(i,j,pion[0],pion[1])
                                    }
    
                                    */
                                }
                                else{
                                    console.log("1e clique");
                                    if(this.strategoTab[i][j] == 0||this.strategoTab[i][j] == 1){
                                        alert("Il n'y a pas de pion sur cette case");
                                    }
                                    /*else if(this.strategoTab[i][j].team != this.turn){
                                        alert("Vous ne pouvez pas déplacer de pion ennemi");
                                    }*/
                                    else{
                                        pion = [i,j];
                                        
                                    }
                                }
                        });
                    }
                }
            //}
    }

    
    take_pion(i,j,x,y){
        if(this.strategoTab[i][j].power> this.strategoTab[x][y].power){
            if(this.strategoTab[i][j].name=="espion"&&this.strategoTab[x][y].name=="marechal"){
                this.strategoTab[x][y]=this.strategoTab[i][j];
                this.strategoTab[i][j]=0;
                this.display();
                return this.strategoTab;
            }
            else if(this.strategoTab[i][j].name=="marechal"&&this.strategoTab[x][y].name=="espion"){
                this.strategoTab[x][y]=this.strategoTab[i][j];
                this.strategoTab[i][j]=0;
                this.display();
                return this.strategoTab;
            }
            /*
            else if(this.strategoTab[i][j].name=="demineur"&&this.strategoTab[x][y].name=="bombe"){
                this.strategoTab[x][y]=this.strategoTab[i][j];
                this.strategoTab[i][j]=0;
                this.display();
                return this.strategoTab;
            }
            else if(this.strategoTab[i][j].name=="bombe"||this.strategoTab[x][y].name=="bombe"){
                this.strategoTab[x][y]=this.strategoTab[i][j]=0;
                this.display();
                return this.strategoTab;
            }*/
            //else if(this.strategoTab[x][y].name=="drapeau"){this.endgame(this.strategoTab[i][j].team);}
            else{
                console.log(this.strategoTab[i][j].name+" a pris " +this.strategoTab[x][y].name);
                this.strategoTab[x][y]=this.strategoTab[i][j];
                this.strategoTab[i][j]=0;
                this.display();
                return this.strategoTab;
            }
        }
        else if(this.strategoTab[i][j].power== this.strategoTab[x][y].power){
            console.log(this.strategoTab[i][j]+" a pris " +this.strategoTab[x][y]);
            this.strategoTab[x][y]=this.strategoTab[i][j]=0;
            this.display();
            return this.strategoTab;
        }
        else{
            //if(this.strategoTab[i][j].name=="drapeau"){this.endgame(this.strategoTab[x][y].team);}
            //else{
                if(this.strategoTab[i][j].name=="demineur"&&this.strategoTab[x][y].name=="bombe"){
                    this.strategoTab[x][y]=this.strategoTab[i][j];
                    this.strategoTab[i][j]=0;
                    this.display();
                    return this.strategoTab;
                }
                console.log(this.strategoTab[x][y].name+" a pris " +this.strategoTab[i][j].name);
                this.strategoTab[i][j]=0;
                this.strategoTab[x][y]=this.strategoTab[x][y];
                this.display();
                return this.strategoTab;
            //}
            
        }

       // if(Espion1==0 &&Eclaireur1==0&&Demineur1==0&&Sergent1==0&&Lieutenant1==0&&Capitaine1==0&&Commandant1==0&&Colonel1==0&&General1==0&&Marechal1==0){this.endgame(2);}
        //else if(Espion2==0 &&Eclaireur2==0&&Demineur2==0&&Sergent2==0&&Lieutenant2==0&&Capitaine2==0&&Commandant2==0&&Colonel2==0&&General2==0&&Marechal2==0){this.endgame(1);}
    }


    endgame(winner){
        if(winner==1){
            alert("Le joueur 1 a gagné");
        }
        else{
            alert("Le joueur 2 a gangé");
        }
    }
/*
        take_pion(i, j, x, y){
            SI pion[i][j].power > pion[x][y].power FAIRE
                SI pion[i][j].name == espion et pion[x][y].name == marechal FAIRE
                espion gagne
                remplacer case par le pion gagnant 
                renvoyer tableau des 2 cotes
                display des 2 cotes
                SI pion[i][j].name == marechal et pion[x][y].name == espion FAIRE
                marechal gagne
                remplacer case par le pion gagnant 
                renvoyer tableau des 2 cotes
                display des 2 cotes
                SI pion.name == bombe
                suppression des 2 pions
                renvoyer tableau des 2 cotes
                display des 2 cotes
                SI pion.name == demineur && pion.name == bombe
                remplacer par demineur
                renvoyer tableau des 2 cotes
                display des 2 cotes
                
                SINON
                prendre pion
                remplacer case par le pion gagnant 
                renvoyer tableau des 2 cotes
                display des 2 cotes

            SINON SI pion[i][j].power = pion[x][y].power FAIRE
            suppression des 2 pions
            renvoyer tableau des 2 cotes
            display des 2 cotes

            SINON FAIRE
            perte de notre pion
            remplacer case par le pion gagnant 
            renvoyer tableau des 2 cotes
            display des 2 cotes
        }
        */
    }