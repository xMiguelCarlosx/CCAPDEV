
import { Router } from 'express';
import User from '../models/User.js';
import Reservation from '../models/Reservation.js';
import dashRouter from './3b-dashRouter.js';
import reserveRouter from './3c-reserveRouter.js';
import settingsRouter from './3d-settingsRouter.js'; 


const homeRouter = Router();

// GET route to retrieve logged-in user's data and render homepage
homeRouter.get("/homepage", async (req, res) => {
    try {
        // Get the logged-in user's email from the session or request object
        const userEmail = req.session.user.email; 

        // Find the user in the database based on the email
        const user = await User.findOne({ email: userEmail }).lean().exec();

        // If user is found, render the homepage template with user data
        if (user) {
            res.render("homepage", {
                title: "Homepage",
                user: user, // Pass the user data to the template
            });
        } else {
            // User not found, handle accordingly
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

//* GET route to render the DASHBOARD page
homeRouter.get("/dashboard", async (req, res) => {
    try {
        // Render the settings page
        res.render("dashboard");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

//* GET route to render the RESERVE page
homeRouter.get("/reserve", async (req, res) => {
    try {
        // Render the settings page
        res.render("reserve");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


// GET route to render the settings page
homeRouter.get("/settings", async (req, res) => {
    try {
        // Render the settings page
        res.render("settings");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

homeRouter.get("/logout", async (req, res) => {
    try {
        
        req.session.destroy();

     
        res.redirect("/2-option");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


homeRouter.use(dashRouter);
homeRouter.use(reserveRouter);
homeRouter.use(settingsRouter);

export default homeRouter;
