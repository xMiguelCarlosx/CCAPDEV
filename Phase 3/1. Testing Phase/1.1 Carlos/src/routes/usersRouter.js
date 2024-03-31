import { Router } from 'express';
import { getDb } from '../db/conn.js';

const userRouter = Router();
const db = getDb();
const users = db.collection("users");

userRouter.get("/users", async (req, res) => {
    const usersArray = await users.find({}).toArray();
    res.render("users", {
        title: "Users",
        users: usersArray
    });
});

userRouter.post("/users", async (req, res) => {
    console.log("POST request received for /users");
    console.log(req.body);
    try {
        const result = await users.insertOne({
            username: req.body.username, 
            color: req.body.color
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

export default userRouter;