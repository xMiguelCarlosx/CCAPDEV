// Loads environment variables from a .env file
require('dotenv/config');

// Imports the express module
const express = require('express');
// Imports the express-handlebars module for templating
const exphbs = require('express-handlebars');

// Imports the connect function from the conn.js file in the models directory
const { connect } = require('./src/models/conn.js');
// Imports the mainRouter module for routing
const router = require('./src/routes/mainRouter.js');

// Async function that sets up the Express app and starts the server
async function main() {
    // Creates a new instance of the Express application
    const app = express();

    // Serves static files from the 'public' directory under the '/static' route
    app.use('/static', express.static('public'));

    // Configures the Handlebars engine for rendering views
    app.engine("hbs", exphbs.engine({
        extname: "hbs",
        helpers: {
            // Helper function to format a Date object into a locale date time string format
            toLocale: function (date) {
                return date.toLocaleString();
            }
        }
    }));
    // Sets Handlebars as the view engine
    app.set("view engine", "hbs");
    // Sets the views directory to './src/views'
    app.set("views", "./src/views");

    // Parses incoming request bodies as JSON
    app.use(express.json());
    // Applies the mainRouter to the Express app
    app.use(router);

    // Starts the Express app and listens on the specified port from the environment variables
    app.listen(process.env.PORT, async function() {
        console.log(`express app is now listening on port ${process.env.PORT}`);
        try {
            // Attempts to connect to the MongoDB database
            await connect();
            console.log(`Now connected to MongoDB`);
        } catch (err) {
            // Logs an error message if the connection to MongoDB fails
            console.log('Connection to MongoDB failed: ');
            console.error(err);
        }
    });
}

// Calls the main function to start the Express app
main();
