/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
const server = app.listen(3333, function(){
    console.log('Servidor online');
})

const io = require('socket.io').listen(server)

app.set('io', io)

io.on('connection', function(socket){
    console.log('conectou')

    socket.on('disconnect', function(){
        console.log('desconectou')
    })

    socket.on('msgParaServidor', function(data){
        socket.emit('msgParaCliente', 
        {apelido: data.apelido, mensagem: data.mensagem})

        socket.broadcast.emit('msgParaCliente', 
        {apelido: data.apelido, mensagem: data.mensagem})

        if(parseInt(data.apelido_atualizado_clientes) === 0 ){

            socket.emit('participantesParaCliente', 
            {apelido: data.apelido})
    
            socket.broadcast.emit('participantesParaCliente', 
            {apelido: data.apelido})
        }
    })
})