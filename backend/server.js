const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Uncaught exception.`);
    console.log(`Error: ${err.message}`);
    process.exit(1);
})
//config
dotenv.config({path: 'backend/config/config.env'});

//connect to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is up and running on port ${process.env.PORT}`)
});

//unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection.`);
    server.close(() => {
        process.exit(1);
    })
});