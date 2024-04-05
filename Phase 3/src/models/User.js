import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const userSchema = new Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    email: {
        type: SchemaTypes.String,
        required: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    }
});
const User = model('User', userSchema); // posts collection 

export default User;
// module.exports = Post;
