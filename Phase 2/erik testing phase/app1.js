  const express = require('express');
const path = require('path');

const app = express();
const port = 3002;

app.use('/images', express.static(path.join(__dirname, 'images')));



const app = express();

const sampleStudents = require('./sampleStudents.js');
const reservedSeats = require('./reservedSeats.js');
const usersData = [];
const reservedData = [];

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


//1ST PAGE----------------------------------------------------------
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '1-welcome-page.html'));
});

app.get('/1-welcome-page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '1-welcome-page.css'));
});

//2ND PAGE----------------------------------------------------------
app.get('/2-register-page.html', function (req, res) {
    res.sendFile(path.join(__dirname, '2-register-page.html'));
});

app.get('/2-register-page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '2-register-page.css'));
});

//3A PAGE----------------------------------------------------------
app.post('/signup', (req, res) => {
    const { FirstName, LastName, email, password } = req.body;
  
    const newUser = {
      FirstName,
      LastName,
      email,
      password
    };
  
    usersData.push(newUser);
    console.log('New user added:', newUser)
    res.redirect('3a-login-option.html');
  });

app.get('/3a-login-option.css', function (req, res) {
    res.sendFile(path.join(__dirname, '3a-login-option.css'));
});

app.get('/3a-login-page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '3a-login-page.css'));
});

//3B PAGE----------------------------------------------------------
app.get('/3b-student-login-page.html', function (req, res) {
    res.sendFile(path.join(__dirname, '3b-student-login-page.html'));
});

app.get('/3b-technician-login-page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '3b-technician-login-page.css'));
});

//4 PAGE----------------------------------------------------------
app.get('/4-home-page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '4-home-page.css'));
});

app.get('/4-home-page.html', function (req, res) {
    res.sendFile(path.join(__dirname, '4-home-page.html'));
});

//4A  PAGE----------------------------------------------------------
app.get('/4a-dashboard.css', function (req, res) {
    res.sendFile(path.join(__dirname, '4a-dashboard.css'));
});

app.get('/4a-dashboard.html', function (req, res) {
    res.sendFile(path.join(__dirname, '4a-dashboard.html'));
});

app.get('/4a-dashboard.css', function (req, res) {
    res.sendFile(path.join(__dirname, '4a-dashboard.css'));
});

//4C PAGE----------------------------------------------------------
app.post('/reserve', (req, res) => {
    const {seatNumber, date, time, email } = req.body;
  
    const newReserve = {
      seatNumber,
      date,
      time,
      email
    };
  
    reservedData.push(newReserve);
    console.log('Reservation made:', newReserve)
    res.redirect('4c-reserve.html');
  });
  
//4D PAGE----------------------------------------------------------
app.get('/4d-settings-page.html', function (req, res) {
    res.sendFile(path.join(__dirname, '4d-settings-page.html'));
});

app.get('/4d-settings-page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '4d-settings-page.css'));
});

//5 PAGE----------------------------------------------------------
app.get('/5-tech-home-page.html', function (req, res) {
    res.sendFile(path.join(__dirname, '5-tech-home-page.html'));
});

app.get('/5-tech-home-page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '5-tech-home-page.css'));
});

//5A PAGE----------------------------------------------------------
app.get('/5a-reserve.html', function (req, res) {
    res.sendFile(path.join(__dirname, '5a-reserve.html'));
});

app.get('/5a-reserve.css', function (req, res) {
    res.sendFile(path.join(__dirname, '5a-reserve.css'));
});

//5B PAGE----------------------------------------------------------
app.get('/5b-search.html', function (req, res) {
    res.sendFile(path.join(__dirname, '5b-search.html'));
});

app.get('/5b-search.css', function (req, res) {
    res.sendFile(path.join(__dirname, '5b-search.css'));
});

//5C PAGE----------------------------------------------------------
app.get('/5c-tech-dashboard.html', function (req, res) {
    res.sendFile(path.join(__dirname, '5c-tech-dashboard.html'));
});

app.get('/5c-tech-dashboard.css', function (req, res) {
    res.sendFile(path.join(__dirname, '5c-tech-dashboard.css'));
});



app.listen(port, function () {
    console.log('Server is listening on port ' + port);
});


//TEMPORARY TEST ONLY --------------------------------------------
//localhost:3002/
