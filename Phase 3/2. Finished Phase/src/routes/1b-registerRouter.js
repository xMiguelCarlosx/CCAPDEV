import { Router } from 'express';
import User from '../models/User.js';

import Reservation from '../models/Reservation.js';

const registerRouter = Router();

registerRouter.get("/register", async (req, res) => {
    try {
        const usersArray = await User.find({}).lean().exec();
        res.render("register", {
            title: "Register",
            users: usersArray
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

registerRouter.post("/register", async (req, res) => {
    console.log("POST request received for /register");
    const { FirstName, LastName, email, password } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // If user with the same email already exists, send a conflict status response
            return res.sendStatus(409); // Conflict
        }

        // Check if a user with the same first and last name already exists
        const existingUserByName = await User.findOne({ FirstName, LastName });

        if (existingUserByName) {
            // If user with the same first and last name already exists, send a conflict status response
            return res.sendStatus(409); // Conflict
        }

        // If no existing user found, create a new user
        const result = await User.create({
            Name: `${FirstName} ${LastName}`,
            email,
            password
        });

         // Create Slots for the new user
       /*const rooms = ['G301', 'G302', 'G303'];
         const seats = ['SEAT1', 'SEAT2', 'SEAT3', 'SEAT4', 'SEAT5', 'SEAT6', 'SEAT7', 'SEAT8', 'SEAT9', 'SEAT10'];
 
         for (const room of rooms) {
             await Slots.create({
                 Room: room,
                 Seat: seats
             }); 
            }  */
        

        console.log(result);
       
   
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default registerRouter;



