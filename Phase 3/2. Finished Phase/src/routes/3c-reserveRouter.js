import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Reservation from '../models/Reservation.js';

const reserveRouter = Router();

reserveRouter.get("/reserve", async (req, res) => {
    try {
        // Retrieve the list of users
        const userArr = await User.find({}).lean().exec();

        // Retrieve all reservations
        const reservesArr = await Reservation.find({}).populate('user').lean().exec();

        // Dynamic data for available seats
        const availableSeatsData = {
            seats: ['Seat 1', 'Seat 2', 'Seat 3', 'Seat 4', 'Seat 5', 'Seat 6', 'Seat 7', 'Seat 8']
        };

        // Pass the data to the template
        res.render("reserve", {
            title: "Reservation",
            users: userArr,
            posts: reservesArr,
            availableSeatsData // This automatically becomes { availableSeatsData: availableSeatsData }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

reserveRouter.post("/reserve", async (req, res) => {
    console.log("POST request received for /reserve");
    try {
        // Insert the new reservation document
        const result = await Reservation.create({
            user: new mongoose.Types.ObjectId(req.body.user),
            chosenSlots: req.body.chosenSlots
        });
        console.log(result);
        res.sendStatus(200); // Send status 200 on success
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Send status 500 on error
    }
});

export default reserveRouter;
