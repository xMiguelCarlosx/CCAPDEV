// Import necessary modules
import { Router } from 'express';
import User from '../models/User.js'; // Import your User model
import Reservation from '../models/Reservation.js';
import dashRouter from './3b-dashRouter.js';

// Define the router
const tech_homeRouter = Router();

// GET route to retrieve logged-in user's data and render homepage
tech_homeRouter.get("/techhomepage", async (req, res) => {
    try {
        // Get the logged-in user's email from the session or request object
        const userEmail = req.session.user.email; // Assuming you're using sessions

        // Find the user in the database based on the email
        const user = await User.findOne({ email: userEmail }).lean().exec();


        // If user is found, render the homepage template with user data
        if (user) {
            res.render("techhomepage", {
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

// Include dashRouter
tech_homeRouter.use(dashRouter);

export default tech_homeRouter;
