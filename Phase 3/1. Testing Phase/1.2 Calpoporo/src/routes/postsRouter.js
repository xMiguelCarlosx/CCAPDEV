import { Router } from 'express';

/**
 * This module handles routes related to Posts 
 * (e.g., post retrieval and creation).
 */
const postsRouter = Router();

// TODO 1: render the posts view with data from the database
postsRouter.get("/posts", (req, res) => {
    // TODO 1.1: retrieve the list of users (object ID, username)
    
    
    // TODO 1.2: retrieve all posts

    // TODO 1.3: pass the lists of users and posts into the template
    res.render("posts", {
        title: "Posts"
    });
});

postsRouter.post("/posts", (req, res) => {
    console.log("POST request received for /posts");
    // TODO 2.1: process and save the POST request from frontend JS
    
    // TODO 2.2: Find matching user document with the given Id

    // TODO 2.3: Insert the new post document using the information from the request, and the ff. fields:
    //       -> the matching user document (i.e., poster)
    //       -> the current date (for date posted)
    // * see views/partials/post.hbs for an idea on how a post document is expected to be structured.

    // TODO 2.4: if successful, send statuscode 200. Otherwise send 500.
});

export default postsRouter;
// In CommonJS, `export default userRouter` is equivalent to:
// module.exports = userRouter;