import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

// Creating a new instance of Router
const postsRouter = Router();

// Getting the database connection using the getDb function
const db = getDb();

// Getting the 'users' and 'posts' collections from the database
const users = db.collection('users');
const posts = db.collection('posts');

// Handling GET requests to '/posts' endpoint
postsRouter.get("/posts", async (req, res) => {
    // Retrieving the list of users (object ID, username)
    const userArr = await users.find({}).toArray();
    
    // Retrieving all posts
    const postsArr = await posts.find({}).toArray();
  
    // Rendering the 'posts' view with the retrieved users and posts data
    res.render("posts", {
        title: "Posts",
        users: userArr,
        posts: postsArr
    });
});

// Handling POST requests to '/posts' endpoint
postsRouter.post("/posts", async (req, res) => {
    console.log("POST request received for /posts");
    
    // Processing and saving the POST request from frontend JS
    console.log(req.body);

    try {
        // Finding the matching user document with the given Id
        const foundUser = await users.findOne({_id: new ObjectId(req.body.user)});
        console.log(foundUser);

        // Inserting the new post document with the matching user document (i.e., poster) as a field
        const result = await posts.insertOne({
            user: foundUser,
            dateTime: new Date(),
            subject: req.body.subject,
            body: req.body.content
        });

        // Sending status code 200 if successful, otherwise send 500
        if (result.acknowledged)
            res.sendStatus(200);
        else
            res.sendStatus(500);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

});

// Exporting the postsRouter for use in other parts of the application
export default postsRouter;
