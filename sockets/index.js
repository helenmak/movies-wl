var user = require('./user')

module.exports = function(wsserver ){ 
    module.exports = wsserver ;

    wsserver.on('connection', (socket)=>{
        user(socket);
})
}
