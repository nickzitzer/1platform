const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const {dbConfig: mongoDBConfig } = require('./config/mongo.db.config');

const restAPIRouter = require('./routes/restapi');
const reactComponentRouter = require('./routes/react.component.api');

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(mongoDBConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database successfully connected!')
    },
    error => {
        console.log('Could not connect to database : ' + error)
    }
);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/rest/', restAPIRouter);
app.use('/api/reactcomponent', reactComponentRouter);

module.exports = app;
