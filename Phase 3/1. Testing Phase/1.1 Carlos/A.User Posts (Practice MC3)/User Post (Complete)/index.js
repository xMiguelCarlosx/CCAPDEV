// System-related packages
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
// Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';
// Routes modules
import router from "./src/routes/indexRouter.js";
// Database modules
import { connectToMongo } from "./src/db/conn.js";

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

