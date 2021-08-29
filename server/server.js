/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
const cors = require('cors');
const session = require('express-session');
// const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

const passport = require('./passport/setup');
const auth = require('./routes/auth');
const app = express();


// Constants
const PORT = 5005;
const HOST = '0.0.0.0';
const MONGO_URI = 'mongodb://192.168.8.13:27017/budgelope';

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
	.then(console.log(`MongoDB connected ${MONGO_URI}`))
	.catch(err => console.log(err));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: 'very secret this is',
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({ mongoUrl: MONGO_URI })
	})
);

app.use(passport.initialize());
app.use(passport.session());


// App
app.use('/api/auth', auth);

app.get('/', (req, res) => {
	res.send('Hello remote world!\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
logger.info(`Running on http://${HOST}:${PORT}`);