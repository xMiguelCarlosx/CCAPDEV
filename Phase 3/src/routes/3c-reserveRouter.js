import { Router } from 'express';

import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Reservation.js';
import Reservation from '../models/Reservation.js';

/**
 * This module handles routes related to Posts 
 * (e.g., post retrieval and creation).
 */
const reserveRouter = Router();

reserveRouter.get("/reserve", async (req, res) => {
    // TODO 1: render the posts view with data from the database
    // TODO 1.1: retrieve the list of users (object ID, username)
    const userArr = await User.find({}).lean().exec();
    // TODO 1.2: retrieve all posts and then populate the user foreign key with the matching user document
    const reservesArr = await Reservation.find({}).populate('user').lean().exec();

    console.log(reservesArr);
    // TODO 1.3: pass the lists of users and posts into template
    res.render("reserve", {
        title: "Reservation",
        users: userArr,
        posts: reservesArr
    });
});

reserveRouter.post("/reserve", async (req, res) => {
    console.log("POST request received for /reserve");
    // TODO 2.1: process and save the POST request from frontend JS

    try {
        // TODO 2.3: Insert the new post document with the date and the userId (foreign key) as fields
        const result = await Reservation.create({
            user: new mongoose.Types.ObjectId(req.body.user),
            chosenSlots: req.body.chosenSlots,

        });

        console.log(result);
        // TODO 2.4: if successful, send statuscode 200. Otherwise send 500.
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

});

export default reserveRouter;
// In CommonJS, `export default userRouter` is equivalent to:
// module.exports = userRouter;