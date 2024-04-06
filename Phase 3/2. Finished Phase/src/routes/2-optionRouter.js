import { Router } from 'express';
import SloginRouter from './2a-SloginRouter.js';
import TloginRouter from './2b-TloginRouter.js';

const optionRouter = Router();

optionRouter.get("/2-option", async (req, res) => {
    try {
        res.render("2-option", {
            title: "Register",
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

optionRouter.use(SloginRouter);
optionRouter.use(TloginRouter);

export default optionRouter;



