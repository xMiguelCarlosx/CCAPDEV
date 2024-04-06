// Importing the Router class from Express
import { Router } from 'express';

// Importing the getDb function from the '../db/conn.js' file
import { getDb } from '../db/conn.js';

// Creating a new instance of Router
const userRouter = Router();

// Getting the database connection using the getDb function
const db = getDb();

// Getting the 'users' collection from the database
const users = db.collection("users");

// Handling GET requests to '/users' endpoint
userRouter.get("/users", async (req, res) => {
    // Finding all documents in the 'users' collection and converting them to an array
    const usersArray = await users.find({}).toArray();

    // Rendering the 'users' view with the retrieved users data
    res.render("users", {
        title: "Users",
        users: usersArray
    });
});

// Handling POST requests to '/users' endpoint
userRouter.post("/users", async (req, res) => {
    console.log("POST request received for /users");
    console.log(req.body);

    try {
        // Inserting a new document into the 'users' collection with data from the request body
        const result = await users.insertOne({
            username: req.body.username, 
            color: req.body.color
        });

        // Logging the result of the insertion
        console.log(result);

        // Sending a success status code (200) back to the client
        res.sendStatus(200);

        // Alternatively, you can simply insert the request body directly into the collection:
        // users.insertOne(req.body);
    } catch (err) {
        // Handling any errors that occur during the insertion process
        console.error(err);

        // Sending a server error status code (500) back to the client
        res.sendStatus(500);
    }
});

// Exporting the userRouter for use in other parts of the application
export default userRouter;
