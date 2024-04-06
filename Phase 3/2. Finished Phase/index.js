// System-related packages
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
// Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session'; // Import express-session package
// Routes modules
import router from "./src/routes/1-welcomeRouter.js";
// Database modules
import { connectToMongo } from "./src/models/conn.js";

async function main () {
    const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
    const app = express();

    app.use("/static", express.static(__dirname + "/public"));
    // Set handlebars as the express app's default view engine
    app.engine("hbs", exphbs.engine({
        extname: 'hbs',
        helpers: {
            toDate: (date) => {
                return date.toUTCString();
            }
        }
    }));
    app.set("view engine", "hbs");
    // directory for views folder
    app.set("views", "./views");
    // View cache to false
    app.set("view cache", false);

    // Initialize session middleware
    app.use(session({
        secret: 'your_secret_key', // Change this to a secret key for session encryption
        resave: false,
        saveUninitialized: false
    }));

    // from this point onwards, we are going to receive json format data
    app.use(express.json());

    app.use(router);

    try {
        // Connect to MongoDB
        await connectToMongo();
        console.log ('Connected to MongoDB.');
        // Start Express App
        app.listen(process.env.SERVER_PORT, () => {
            console.log("Express app now listening...");
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }

}

main();
