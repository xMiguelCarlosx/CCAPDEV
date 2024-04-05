import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const ReservationSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    chosenRoom: [{
        type: SchemaTypes.String,
        required: true
    }],

    chosenSeats: [{
        type: SchemaTypes.String,
        required: true
    }],

    chosenTime: [{
        type: SchemaTypes.String,
        required: true
    }],

    chosenDate: [{
        type: SchemaTypes.String,
        required: true
    }],
    Status: {
        type: SchemaTypes.String,
        required: true
    }
});
const Reservation = model('Reservation', ReservationSchema); // posts collection 

export default Reservation;
// module.exports = Post;