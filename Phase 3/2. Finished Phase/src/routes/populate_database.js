// populateDB.js
require('dotenv/config');
const { connect, disconnect } = require('./src/models/conn.js');
const User = require('./src/models/Users.js');

async function populateDB() {
    try {
        await connect();
        await User.deleteMany({});

        const results = await User.insertMany([
            {
                Name: 'Miguel Carlos',
                email: 'miguel_carlos@dlsu.edu.ph.com',
                password: '1'
            },
            {
                Name: 'Jose Calpoporo',
                email: 'jose_calpoporo@dlsu.edu.ph.com',
                password: '12'
            },
            {
                Name: 'Erik Rodriguez',
                email: 'erik_rodriguez@dlsu.edu.ph.com',
                password: '123'
            },
            {
                Name: 'Yuri Olivares',
                email: 'yuri_olivares@dlsu.edu.ph.com',
                password: '12345'
            },
            {
                Name: 'John Salvador',
                email: 'john_salvador@dlsu.edu.ph.com',
                password: '123456'
            },
        ]);

        console.log('Database has been populated: ');
        console.log(results);
        disconnect();
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

populateDB();
