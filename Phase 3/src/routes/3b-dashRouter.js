// dashRouter.js
// Import necessary modules
import { Router } from 'express';
import User from '../models/User.js'; // Assuming this path is correct
import Reservation from '../models/Reservation.js'; // Assuming this path is correct

const dashboardRouter = Router();

dashboardRouter.get("/dashboard", async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.email) {
            return res.redirect("/login");
        }

        const userEmail = req.session.user.email;
        const user = await User.findOne({ email: userEmail }).lean();

        if (!user) {
            return res.status(404).send("User not found");
        }

        const reservations = await Reservation.find({ user: user._id }).populate('user').lean();

        res.render("dashboard", {
            user: user,
            reservations: reservations
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default dashboardRouter;