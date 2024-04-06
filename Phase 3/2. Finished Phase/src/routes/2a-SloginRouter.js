import { Router } from 'express';
import User from '../models/User.js';
import Reservation from '../models/Reservation.js';
import homeRouter from './3-homeRouter.js';
import session from 'express-session'; 

const SloginRouter = Router();

// Initialize session middleware
SloginRouter.use(session({
    secret: 'your_secret_key', // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: false
}));

// Render the login form
SloginRouter.get("/Slogin", async (req, res) => {
    try {
        res.render("Slogin", {
            title: "Student Login",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Handle login POST request
SloginRouter.post('/Slogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database for a user with the provided email
        const user = await User.findOne({ email }).lean().exec();

        if (user) {
            // Check if the password matches the one stored in the database
            if (user.password === password) {
                // Password matches, proceed to homepage
                // Save the user's first name to the session
                req.session.user = {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    email: user.email // You can store additional user data in the session if needed
                };

      

                res.redirect("/homepage");
            } else {
                // Password does not match, send unauthorized response
                res.status(401).send("Incorrect password");
            }
        } else {
            // User not found, send unauthorized response
            res.status(401).send("User not found");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});


SloginRouter.use(homeRouter);

export default SloginRouter;
