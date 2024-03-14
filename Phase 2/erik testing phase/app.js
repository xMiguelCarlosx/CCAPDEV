const express = require('express');
const app = express();

const sampleStudents = require('./sampleStudents.js');
const reservedSeats = require('./reservedSeats.js');
const usersData = [];
const reservedData = [];

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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


app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${3000}`);
  });