import { Router } from 'express';
import User from '../models/User.js';
import Reservation from '../models/Reservation.js';
import tech_homeRouter from './3a-tech-homeRouter.js';
import session from 'express-session'; 

const TloginRouter = Router();

// Initialize session middleware
TloginRouter.use(session({
    secret: 'your_secret_key', // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: false
}));

// Render the login form
TloginRouter.get("/Tlogin", async (req, res) => {
    try {
        res.render("Tlogin", {
            title: "Technician Login",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Handle login POST request
TloginRouter.post('/Tlogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the provided email and password match the technician's credentials
        if (email === "technician@gmail.com" && password === "DLSU123") {
            // Password matches, proceed to homepage
            // Save the technician's email to the session
            req.session.user = {
                email: email // Set the email property to the logged-in user's email
            };
            res.redirect("/techhomepage");
        } else {
            // Incorrect email or password, send unauthorized response
            res.status(401).send("Incorrect email or password");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});


TloginRouter.use(tech_homeRouter);

export default TloginRouter;
