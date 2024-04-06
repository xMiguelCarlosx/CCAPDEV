import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

/**
 * This module handles routes related to Posts 
 * (e.g., post retrieval and creation).
 */
const postsRouter = Router();
const db = getDb();
const users = db.collection('users');
const posts = db.collection('posts');

postsRouter.get("/posts", async (req, res) => {
    // TODO 1: render the posts view with data from the database
    // TODO 1.1: retrieve the list of users (object ID, username)
    const userArr = await users.find({}).toArray();
    // TODO 1.2: retrieve all posts
    const postsArr = await posts.find({}).toArray();
    // TODO 1.3: pass the lists of users and posts into template
    res.render("posts", {
        title: "Posts",
        users: userArr,
        posts: postsArr
    });
});

postsRouter.post("/posts", async (req, res) => {
    console.log("POST request received for /posts");
    // TODO 2.1: process and save the POST request from frontend JS
    console.log(req.body);

    try {
        // TODO 2.2: Find matching user document with the given Id
        const foundUser = await users.findOne({_id: new ObjectId(req.body.user)}); // This is how we match MongoDB objectIds with the find method
        console.log(foundUser);

        // TODO 2.3: Insert the new post document with the matching user document (i.e., poster) as a field
        const result = await posts.insertOne({
            user: foundUser,
            dateTime: new Date(),
            subject: req.body.subject,
            body: req.body.content
        });
        // TODO 2.4: if successful, send statuscode 200. Otherwise send 500.
        if (result.acknowledged)
            res.sendStatus(200);
        else
            res.sendStatus(500);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

});

export default postsRouter;
// In CommonJS, `export default userRouter` is equivalent to:
// module.exports = userRouter;