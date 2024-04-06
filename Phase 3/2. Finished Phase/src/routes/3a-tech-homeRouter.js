// 3A-TECH-HOMEROUTER
import { Router } from 'express';
import User from '../models/User.js'; 
import Reservation from '../models/Reservation.js';
import dashRouter from './3b-dashRouter.js';
import reserveRouter from './3c-reserveRouter.js';


const tech_homeRouter = Router();

// GET route to retrieve logged-in user's data and render homepage
tech_homeRouter.get("/techhomepage", async (req, res) => {
    try {
        // Check if the logged-in user is the technician
        const userEmail = req.session.user.email; // Assuming you're using sessions

        if (userEmail === "technician@gmail.com") {
            // Render the technician homepage template
            res.render("techhomepage", {
                title: "Technician Homepage"
            });
        } else {
            // Redirect to login page if the logged-in user is not the technician
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

//* GET route to render the DASHBOARD page
tech_homeRouter.get("/tech_dashboard", async (req, res) => {
    try {
        // Render the settings page
        res.render("tech_dashboard");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

//* GET route to render the RESERVE page
tech_homeRouter.get("/tech_edit_reserve", async (req, res) => {
    try {
        // Render the settings page
        res.render("tech_edit_reserve");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});




tech_homeRouter.get("/logout", async (req, res) => {
    try {
       
        req.session.destroy();

        // Redirect to the option page after logout
        res.redirect("/2-option");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


tech_homeRouter.use(dashRouter);

tech_homeRouter.use(reserveRouter);

export default tech_homeRouter;
