/**** Import npm libs ****/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")({
  // CIR2-chat encode in sha256
  secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    secure: false
  }
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

/**** Project configuration ****/

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Init of express, to point our assets
app.use(express.static(__dirname + '/front/'));
app.use(urlencodedParser);
app.use(session);

// Configure socket io with session middleware
io.use(sharedsession(session, {
  // Session automatiquement sauvegardée en cas de modification
  autoSave: true
}));

// Détection de si nous sommes en production, pour sécuriser en https
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  session.cookie.secure = true // serve secure cookies
}

/**** Code ****/

app.get('/', (req, res) => {
  let sessionData = req.session;

  // Si l'utilisateur n'est pas connecté
  if (!sessionData.username) {
    res.sendFile(__dirname + '/front/html/login.html');
  } else {
    res.sendFile(__dirname + '/front/html/game_init.html');
  }
});
app.get('/game.html', function(req, res) {
  res.sendFile(__dirname + "/front/html/game.html");
});
app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => {
  const login = req.body.login

  // Error management
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    //return res.status(400).json({ errors: errors.array() });
  } else {
    // Store login
    req.session.username = login;
    req.session.save()
    res.redirect('/');
  }
});

let roomn = 1;
  var array_1 = [[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [3,3,1,1,3,3,1,1,3,3],
              [3,3,1,1,3,3,1,1,3,3],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0]];
  var array_2 = [[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [3,3,1,1,3,3,1,1,3,3],
              [3,3,1,1,3,3,1,1,3,3],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0]];

  var array = [[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [3,3,1,1,3,3,1,1,3,3],
              [3,3,1,1,3,3,1,1,3,3],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0]];
  var playersState = [0,0];

io.on('connection', (socket) => {
  //console.log('User connected');
  console.log(socket.handshake.session.username + " connected");

  if(io.sockets.adapter.rooms.get("room-"+roomn) && io.sockets.adapter.rooms.get("room-"+roomn).size > 1){
        roomn++;
  }

  socket.join("room-"+roomn);

  let tmpId;
    if(io.sockets.adapter.rooms.get("room-"+roomn).size == 1){
        tmpId = 1;
    } else{
        tmpId = 2;
    }
    let dataPlayer = {
        name:socket.handshake.session.username,
        id:tmpId
  }


  socket.on('array1', (array1) =>{
           socket.emit('array1', array1);
           array_1 = array1;
           playersState[0] = 1;
  });

  socket.on('array2', (array2) =>{
           socket.emit('array2', array2);
          array_2 = array2;
          playersState[1] = 1;
  });

  socket.on('finalarray', () =>{
    if(playersState[0] == 1 && playersState[1] == 1){
        array_2 = JSON.parse(array_2);
        array_1 = JSON.parse(array_1);
        console.log("array2" + typeof array_2 + array_2);
        console.log("\narray1" + typeof array_1 + array_1);
        console.log("\narray " + typeof array +  array);
        for(let i = 0; i < 10; i++){
              for(let j = 0; j < 10; j++){
                  if(typeof array_1[i][j] != "number"){
                    array[i][j] = array_1[i][j]
                  }
                  if(typeof array_2[i][j] != "number"){
                    array[i][j] = array_2[i][j]
                  }

              }
          }
        socket.emit('finalarray', array);
        console.log("\ntest " + array);
    }
    });

  let rdy1;
  let rdy2;

  socket.on('Rdy1', (joueur1) =>{
    console.log(joueur1);
    let rdy1 = joueur1;
  })

  socket.on('Rdy2', (joueur2) =>{
    console.log(joueur2);
    let rdy2 = joueur2;
  })
  socket.on('newTurn',(turn)=>{
    if(turn==1){turn=2;}
    else{turn=1;}
    socket.emit('newTurnrep',turn);
  })
  socket.emit('sendData', dataPlayer);

  io.sockets.in("room-"+roomn).emit('connectToRoom', roomn);

    let nbRoom = 0;
    socket.on('nameRoom', (room)=>{
        nbRoom = room;
        nbRoom = nbRoom.slice(5);
        nbRoom = parseInt(nbRoom);

        console.log("room = "+room);
  });

  socket.on("login", () => {
    let srvsockets = io.sockets.sockets;
    srvsockets.forEach(user => {
      io.emit('pseudo', user.handshake.session.username);
      console.log(user.handshake.session.username);
    });
    io.emit('new-message', 'Utilisateur ' + socket.handshake.session.username + ' connected');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    //Envoie le message pour tous!
    io.emit('new-message', socket.handshake.session.username + ' : ' + msg);
  });

  socket.on('disconnect', () => {
    io.emit('new-message', 'Serveur : Utilisateur ' + socket.handshake.session.username + ' disconnected');
    console.log('User disconnected');
  });
});

http.listen(4200, () => {
  console.log('Serveur lancé sur le port 4200');
});
