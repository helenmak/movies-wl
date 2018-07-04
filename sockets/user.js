const jsonLoader = require('../utils/jsonLoader.js');
const models = require('../models');

module.exports = function(socket) {

    socket.on('/add_dictionary', (data)=>{
        //socket.emit('event', {value: data.value})
        file = data.files.toString();
        let parsedFile = JSON.parse(file);

        //for not to add the same data into Dictionary DB
        for(let i=0; i < parsedFile.length; i++) {
            console.log('parsedFile[i].book' + parsedFile[i].book)
            let checkbook = models.Dictionary.findOne({book: parsedFile[i].book}).exec().then((result)=>{
                if(result){
                    let checkword = models.Dictionary.findOne({keyword: parsedFile[i].keyword}).exec().then((result)=>{
                        if(!result){
                            jsonLoader(file, ['keyword', 'descriptions', 'book'], ['keyword', 'description', 'book'], models.Dictionary);
                        }
                    })
                }
            })
        }

        //jsonLoader(file, ['keyword', 'descriptions', 'book'], ['keyword', 'description', 'book'], models.Dictionary);

        for(let i=0; i < parsedFile.length; i++) { //может, собирать бук с файла в массив, и брать только один экзмепляр каждого, а это стереть?
            console.log(parsedFile[i].book)
            models.Book.findOne({name: parsedFile[i].book}).exec().then((result)=>{
                if(!result) {
                    console.log(!result)
                    let book = new models.Book({
                        name: parsedFile[i].book
                    });
                    book.save();
                }
            })
        }
    });

};
