// Import necessary modules and models
import { Router } from 'express';
import User from '../models/User.js'; // Assuming User model is defined in User.js
import multer from 'multer'; // For handling file uploads
import path from 'path'; // For file path manipulation









// Define the settings router
const settingsRouter = Router();






// Update profile picture
settingsRouter.post('/', upload.single('profile-picture'), async (req, res) => {
    try {
        // Update the user's profile picture in the database
        await User.updateOne({ _id: req.session.user._id }, { profilePicture: req.file.path });
        res.redirect('/settings'); // Redirect to settings page
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Delete account
settingsRouter.post('/delete-account', async (req, res) => {
    try {
        // Delete the user's account from the database
        await User.deleteOne({ _id: req.session.user._id });
        req.session.destroy(); // Destroy the session
        res.redirect('/1-welcome-page'); // Redirect to welcome page
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Modify profile description
settingsRouter.post('/update-profile-picture', async (req, res) => {
    try {
        // Update the user's profile description in the database
        await User.updateOne({ _id: req.session.user._id }, { description: req.body.description });
        res.redirect('/settings'); // Redirect to settings page
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Export the settings router


export default settingsRouter;
