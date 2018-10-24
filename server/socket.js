const io = require('socket.io')();
const cantidadDeColores = 5;
var chatsRooms = {};

io.on('connection', (socket) => {
 
  // Enviamos todas los rooms existentes
  io.emit('salasExitentes', Object.keys(chatsRooms));

  socket.on('subscribeToChatRoom', ({ username, chatRoom }) => {

    // Funcion que manda los mensajes a los user del x chat
    let sendMessage = (message, username, chatRoom) => {
      
      if(username === undefined)
      {
        userSender = { nombre: 'Bot', color: cantidadDeColores }
      }
      else
      {
        var userSender = chatsRooms[chatRoom].find(function(u) {
          return u.nombre === username;
        }); 
      }

      io.to(chatRoom).emit('message', { userSender, date: new Date(), text: message, styleForUserName: ''});
    }

    // Envia los usuarios conectados a un room
    let sendUsuarios = (chatRoom) => {
      io.to(chatRoom).emit('usersOnRoom', chatsRooms[chatRoom]);
    }


    // Al subscribirse al chat
    var nuevoUser = {nombre: username, color: -1};

    chatsRooms[chatRoom] = [].concat(chatsRooms[chatRoom], [nuevoUser]);
    chatsRooms[chatRoom] = chatsRooms[chatRoom].filter(u => u !== undefined);

    socket.join(chatRoom);
   
    chatsRooms[chatRoom].forEach(function setColorUsers(user, index) {
        user.color = index % cantidadDeColores;
    });

    sendMessage(`el usuario ${username} se ha conectado a la sala`, undefined, chatRoom);

    // Funcion que avisa a todos que un usuario se desconecto
    socket.on('disconnect', function(){
      sendMessage(`el usuario ${username} se ha desconectado de la sala`, undefined, chatRoom);
   
      if(username !== undefined)
        chatsRooms[chatRoom] = chatsRooms[chatRoom].filter(u => u.nombre !== username);

      sendUsuarios(chatRoom); 
      socket.leave(chatRoom);
    });

    // Si estas subscrito al evento message se envian los mensajes
    socket.on('message', (message) => {
      sendMessage(message, username, chatRoom);
    });
    
    // Si estas subscrito al evento message se envian los usuarios conectados de tu sala
    socket.on('usersOnRoom', (message) => {
      sendUsuarios(chatRoom);
    });
    
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);