import { Router } from 'express';
import userRouter from './usersRouter.js';
import postsRouter from './postsRouter.js';

/**
 * This module is the `main` router. All subrouters should be added into this.
 * The program entry point (~/index.js) uses this router.
 */
const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Homepage"
    });
});

router.get("/home", (req, res) => {
    res.redirect("/");
});

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

router.use(userRouter);
router.use(postsRouter);

router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;
// In CommonJS, `export default userRouter` is equivalent to:
// module.exports = userRouter;