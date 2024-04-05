import { Router } from 'express';
import User from '../models/User.js';
import Reservation from '../models/Reservation.js';

const registerRouter = Router();

registerRouter.get("/register", async (req, res) => {
    try {
        const usersArray = await User.find({}).lean().exec();
        res.render("register", {
            title: "Register",
            users: usersArray
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

registerRouter.post("/register", async (req, res) => {
    console.log("POST request received for /register");
    const { FirstName, LastName, email, password } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // If user with the same email already exists, send a conflict status response
            return res.sendStatus(409); // Conflict
        }

        // Check if a user with the same first and last name already exists
        const existingUserByName = await User.findOne({ FirstName, LastName });

        if (existingUserByName) {
            // If user with the same first and last name already exists, send a conflict status response
            return res.sendStatus(409); // Conflict
        }

        // If no existing user found, create a new user
        const result = await User.create({
            Name: `${FirstName} ${LastName}`,
            email,
            password
        });

       /* const result2 = await Reservation.create({
            Name: `${FirstName} ${LastName}`, // Concatenate FirstName and LastName
            email: email,
            Status: "Enter your description in Settings CHECK",
            chosenSlots: [],
            chosenTime: [],
            chosenSeats: [],
            ChosenDate: []
        }); */
        

        console.log(result);
        console.log(result2);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default registerRouter;





/*import { Router } from 'express';
import User from '../models/User.js';
import optionRouter from './optionRouter.js';

const registerRouter = Router();

registerRouter.get("/register", async (req, res) => {
    try {
        const usersArray = await User.find({}).lean().exec();
        res.render("register", {
            title: "Register",
            users: usersArray
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

registerRouter.post("/register", async (req, res) => {
    console.log("POST request received for /register");
    try {
        const result = await User.create({
            firstName: req.body.FirstName, 
            lastName: req.body.LastName, 
            email: req.body.email,
            password: req.body.Cpassword
        });

        console.log(result);
        res.sendStatus(200);
    // or you can write
    // users.insertOne(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

registerRouter.use(optionRouter);
registerRouter.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});


export default registerRouter;

*/

