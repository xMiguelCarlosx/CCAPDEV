import { Router } from 'express';
import userRouter from './usersRouter.js';
import postsRouter from './postsRouter.js';

/**
 * This module is the `main` router. All subrouters should be added into this.
 * The program entry point (~/index.js) uses this router.
 */
const router = Router();

// Route to render the index (homepage) template
router.get("/", (req, res) => {
    res.render("index", {
        title: "Homepage"
    });
});

// Redirects to the homepage (index route)
router.get("/home", (req, res) => {
    res.redirect("/");
});

// Redirects to the homepage (index route)
router.get("/homepage", (req, res) => {
    res.redirect("/");
});

// Mounts the userRouter at the root level
router.use(userRouter);

// Mounts the postsRouter at the root level
router.use(postsRouter);

// Route for handling 404 errors (page not found)
router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

// Exports the router for use in other modules
export default router;
// In CommonJS, `export default userRouter` is equivalent to:
// module.exports = userRouter;
