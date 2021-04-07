class game{
    constructor(){
        this.listeners();
        this.strategoTab = JSON.parse(sessionStorage.getItem('table'));
        this.turn=2;
        console.log(this.strategoTab);
        this.display();
    }
    
    display(){
            let tabl = document.getElementById("tab"); 
            /*
            this.strategoTab = JSON.parse( "[" + sessionStorage.getItem('table') + "]");
            if(typeof this.strategoTab=== "string"){
                  this.strategoTab = JSON.parse(this.strategoTab);
            }
            this.strategoTab = this.strategoTab[0];*/
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
            console.log("equipe " + JSON.parse(sessionStorage.getItem('team')));
            //if(this.turn){
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10; j++) {
                        tabl.rows[i].cells[j].addEventListener('click', () => {
                                if(pion){ // et que 
                                    if((i==pion[0]+1&&j==pion[1])||(i==pion[0]-1&&j==pion[1])||(i==pion[0]&&j==pion[1]+1)||(i==pion[0]&&j==pion[1]-1)){
                                        if(this.strategoTab[i][j] == 0){
                                            console.log("2e clique");
                                            this.strategoTab[i][j] = this.strategoTab[pion[0]][pion[1]];
                                            this.strategoTab[pion[0]][pion[1]] = 0;
                                            console.log("tableau " + this.strategoTab);
                                            (() => {
                                                 const socket = io();
                                                 console.log("tableau 2 " + this.strategoTab);
                                                 socket.emit('finalarray', this.strategoTab);
                                            })()
                                            this.display();
                                            /*(() => {
                                                const socket = io();
                                               socket.emit('newTurn',this.turn);
                                               socket.on('newTurnRep',(nturn)=>{
                                                   this.turn=nturn;
                                               })
                                            })();*/
                                            pion = null;
                                        }
                                        else if(this.strategoTab[i][j] == 1){ // || this.strategoTab[i][j] == 'P'){
                                            alert("Vous ne pouvez pas aller ici");
                                            pion = null;
                                        }
                                        else{
                                            if(JSON.parse(sessionStorage.getItem('team')) == this.strategoTab[pion[0]][pion[1]].team){
                                                alert("Vous ne pouvez pas aller ici");
                                            }
                                            else{
                                                this.take_pion(i,j,pion[0],pion[1]);
                                            }
                                            this.take_pion(pion[0],pion[1],i,j);
                                            /*if(this.turn==1){this.turn=2;}
                                            else{this.turn=1;}*/
                                            /*(() => {
                                                const socket = io();
                                               socket.emit('newTurn',this.turn);
                                               socket.on('newTurnRep',(nturn)=>{
                                                   this.turn=nturn;
                                               })
                                            })();*/
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
                                    console.log(sessionStorage.getItem('team'));
                                    console.log(this.turn)
                                    console.log("1e clique");
                                    if(this.strategoTab[i][j] == 0 ||this.strategoTab[i][j] == 1){
                                        alert("Il n'y a pas de pion sur cette case");
                                    }
                                    else if(this.strategoTab[i][j].team != JSON.parse(sessionStorage.getItem('team'))){
                                        alert("Vous ne pouvez pas déplacer de pion ennemi");
                                    }
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
            if(this.strategoTab[x][y].name=="Drapeau"){this.endgame(this.strategoTab[i][j].team);}
            else{
                console.log(this.strategoTab[i][j].name+" a pris " +this.strategoTab[x][y].name);
                if (this.strategoTab[x][y].name == "Espion"){
                    if(this.strategoTab[x][y].team==1){Espion1--;}
                    else{Espion2--;}
                  }
                  if (this.strategoTab[x][y].name == "Eclaireur"){
                    if(this.strategoTab[x][y].team==1){Eclaireur1--;}
                    else{Eclaireur2--;}
                  }
                  if (this.strategoTab[x][y].name == "Demineur"){
                    if(this.strategoTab[x][y].team==1){Demineur1--;}
                    else{Demineur2--;}
                  }
                  if (this.strategoTab[x][y].name == "Sergent"){
                    if(this.strategoTab[x][y].team==1){Sergent1--;}
                    else{Sergent2--;}
                  }
                  if (this.strategoTab[x][y].name == "Capitaine"){
                    if(this.strategoTab[x][y].team==1){Capitaine1--;}
                    else{Capitaine2--;}
                  }
                  if (this.strategoTab[x][y].name == "Lieutenant"){
                    if(this.strategoTab[x][y].team==1){Lieutenant1--;}
                    else{Lieutenant2--;}
                  } 
                  if (this.strategoTab[x][y].name == "Commandant"){
                    if(this.strategoTab[x][y].team==1){Commandant1--;}
                    else{Commandant2--;}
                  } 
                  if (this.strategoTab[x][y].name == "Colonel"){
                    if(this.strategoTab[x][y].team==1){Colonel1--;}
                    else{Colonel2--;}
                  } 
                  if (this.strategoTab[x][y].name == "General"){
                    if(this.strategoTab[x][y].team==1){General1--;}
                    else{General2--;}
                  } 
                  if (this.strategoTab[x][y].name == "Marechal"){
                    if(this.strategoTab[x][y].team==1){Marechal1--;}
                    else{Marechal2--;}
                  } 
                  if (this.strategoTab[i][j].name == "Bombes"){
                    if(this.strategoTab[i][j].team==1){Bombe1--;}
                    else{Bombe2--;}
                  } 
                this.strategoTab[x][y]=this.strategoTab[i][j];
                this.strategoTab[i][j]=0;
                this.display();
                (() => {
                                                 const socket = io();
                                                 console.log("tableau 2 " + this.strategoTab);
                                                 socket.emit('finalarray', this.strategoTab);
                                            })()
                
                return this.strategoTab;
            }
        }
        else if(this.strategoTab[i][j].power== this.strategoTab[x][y].power){
            console.log(this.strategoTab[i][j]+" a pris " +this.strategoTab[x][y]);
            this.strategoTab[x][y]=this.strategoTab[i][j]=0;
            this.display();
            (() => {
                                                 const socket = io();
                                                 console.log("tableau 2 " + this.strategoTab);
                                                 socket.emit('finalarray', this.strategoTab);
                                            })()
            
            return this.strategoTab;
        }
        else{
            if(this.strategoTab[i][j].name=="espion"&&this.strategoTab[x][y].name=="marechal"){
                this.strategoTab[x][y]=this.strategoTab[i][j];
                this.strategoTab[i][j]=0;
                (() => {
                                                 const socket = io();
                                                 console.log("tableau 2 " + this.strategoTab);
                                                 socket.emit('finalarray', this.strategoTab);
                                            })()
                this.display();
            }
            else if(this.strategoTab[i][j].name=="demineur"&&this.strategoTab[x][y].name=="bombe"){
                    this.strategoTab[x][y]=this.strategoTab[i][j];
                    this.strategoTab[i][j]=0;
                    (() => {
                                                 const socket = io();
                                                 console.log("tableau 2 " + this.strategoTab);
                                                 socket.emit('finalarray', this.strategoTab);
                                            })()
                    this.display();  
            }
            else{console.log(this.strategoTab[x][y].name+" a pris " +this.strategoTab[i][j].name);
            this.strategoTab[i][j]=0;
            this.strategoTab[x][y]=this.strategoTab[x][y];
            (() => {
                                                 const socket = io();
                                                 console.log("tableau 2 " + this.strategoTab);
                                                 socket.emit('finalarray', this.strategoTab);
                                            })()
            this.display();
            }
            if (this.strategoTab[i][j].name == "Espion"){
                if(this.strategoTab[i][j].team==1){Espion1--;}
                else{Espion2--;}
              }
              if (this.strategoTab[i][j].name == "Eclaireur"){
                if(this.strategoTab[i][j].team==1){Eclaireur1--;}
                else{Eclaireur2--;}
              }
              if (this.strategoTab[i][j].name == "Demineur"){
                if(this.strategoTab[i][j].team==1){Demineur1--;}
                else{Demineur2--;}
              }
              if (this.strategoTab[i][j].name == "Sergent"){
                if(this.strategoTab[i][j].team==1){Sergent1--;}
                else{Sergent2--;}
              }
              if (this.strategoTab[i][j].name == "Capitaine"){
                if(this.strategoTab[i][j].team==1){Capitaine1--;}
                else{Capitaine2--;}
              }
              if (this.strategoTab[i][j].name == "Lieutenant"){
                if(this.strategoTab[i][j].team==1){Lieutenant1--;}
                else{Lieutenant2--;}
              } 
              if (this.strategoTab[i][j].name == "Commandant"){
                if(this.strategoTab[i][j].team==1){Commandant1--;}
                else{Commandant2--;}
              } 
              if (this.strategoTab[i][j].name == "Colonel"){
                if(this.strategoTab[i][j].team==1){Colonel1--;}
                else{Colonel2--;}
              } 
              if (this.strategoTab[i][j].name == "General"){
                if(this.strategoTab[i][j].team==1){General1--;}
                else{General2--;}
              } 
              if (this.strategoTab[i][j].name == "Marechal"){
                if(this.strategoTab[i][j].team==1){Marechal1--;}
                else{Marechal2--;}
              } 
              if (this.strategoTab[i][j].name == "Bombes"){
                if(this.strategoTab[i][j].team==1){Bombe1--;}
                else{Bombe2--;}
              }     


            return this.strategoTab;
        }

        if(Espion1==0 &&Eclaireur1==0&&Demineur1==0&&Sergent1==0&&Lieutenant1==0&&Capitaine1==0&&Commandant1==0&&Colonel1==0&&General1==0&&Marechal1==0){this.endgame(2);}
        else if(Espion2==0 &&Eclaireur2==0&&Demineur2==0&&Sergent2==0&&Lieutenant2==0&&Capitaine2==0&&Commandant2==0&&Colonel2==0&&General2==0&&Marechal2==0){this.endgame(1);}
    }


    endgame(winner){
        if(winner==1){
            alert("Le joueur 1 a gagné");
        }
        else{
            alert("Le joueur 2 a gagné");
        }
    }
  }