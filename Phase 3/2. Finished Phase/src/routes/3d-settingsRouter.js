// 3d-settingsRouter.js


import User from '../models/User.js';
import express from 'express';


const settingsRouter = express.Router();

settingsRouter.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.user._id });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('settings', { user: user });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

export default settingsRouter;










/*
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const server = express();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const settingsRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

settingsRouter.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.user._id });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('settings', { user: user });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});


settingsRouter.post('/', upload.single('profile-picture'), async (req, res) => {
    try {
        await User.updateOne({ _id: req.session.user._id }, { profilePicture: req.file.path });
        res.redirect('/settings');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

settingsRouter.post('/delete-account', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.session.user._id });
        req.session.destroy();
        res.redirect('/1-welcome-page');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

settingsRouter.post('/update-profile-description', async (req, res) => {
    try {
        await User.updateOne({ _id: req.session.user._id }, { description: req.body.description });
        res.redirect('/settings');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default settingsRouter;
*/
