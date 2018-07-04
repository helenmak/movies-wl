let loader = function(file, fileFields, dbFields, model){
    typeof file === 'string' ? file = JSON.parse(file) : file;
    for(var i=0; i < file.length; i++) {
        let doc = new model({
        });
        fileFields.forEach( function(field, number){
            doc[dbFields[number]] = file[i][field];
        });
        doc.save();
    }
};

module.exports = loader;
