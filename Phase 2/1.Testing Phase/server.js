const express =
    require('express');
// app is our server object
const app = express();
app.get('/home', (req, res) => { 
    console.log("Request received for /home");
    res.sendFile(__dirname + '/Phase 2/1.Testing Phase');   
        




});


console.log("Request received for /home");
res.sendFile(__dirname + '/views/index.html'); //filepath here
app.get('/profile', (req, res) => {
            console.log("Request received for /profile");
            res.send(  )});
