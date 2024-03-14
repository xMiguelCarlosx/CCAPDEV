const express = require('express');
const app = express();

const sampleStudents = require('./sampleStudents.js');
const usersData = [];

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


app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${3000}`);
  });