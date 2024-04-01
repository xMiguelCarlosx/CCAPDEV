const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/UserPosts')

const UserSchema = new mongoose.Schema({
    name: String, 
    age:Number
})


app.get("/UserPosts", (req, res) => {
    UserModel.find({})
        .then(function(users) {
            res.json(users);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send("Error retrieving users");
        });
});


app.listen(27017, () => {
console.log("Server is running on port")

})
