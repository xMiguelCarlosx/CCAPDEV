import { Router } from 'express';

import registerRouter from './1b-registerRouter.js';
import optionRouter from './2-optionRouter.js';


/**
 * This module is the `main` router. All subrouters should be added into this.
 * The program entry point (~/index.js) uses this router.
 */
const welcomeRouter = Router();

welcomeRouter.get("/", (req, res) => {
    res.render("1-welcome-page", {
        title: "Lab Reservation"
    });
});

welcomeRouter.get("/welcome", (req, res) => {
    res.redirect("/");
});

welcomeRouter.get("/welcomepage", (req, res) => {
    res.redirect("/");
});

welcomeRouter.use(registerRouter);
welcomeRouter.use(optionRouter);

welcomeRouter.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default welcomeRouter;
