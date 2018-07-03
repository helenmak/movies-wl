const socket = io();
console.log('script')
let loadJson = function(event){ //ToDo: можно сделать превью для содержания через файл апи
    // let options = {
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     data: file
    // };
    // fetch('/add_dictionary', options)
    let files = event.target.files;
    let arr = [];
    display.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
        console.log('for cycle')
        arr.push(files[i]);
        // let reader = new FileReader();
        // reader.onload = (function(file){
        //     console.log('reader onload')
        //     return function(e) {
        //         console.log('inner onload function')
        //         display.innerHTML += e.target.result//['<img class="thumb" src="', e.target.result,'"/>'].join('');
        //     };
        // })(files[i]);
        // reader.readAsText(files[i]);
        display.innerHTML += "<br/>" + files[i].name;
    }

    socket.emit('/add_dictionary', {files: arr});

};

let filesElem = document.getElementById('loadDictionary');
let display = document.querySelector('.display');
filesElem.addEventListener('change', loadJson);
