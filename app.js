const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const { readdirSync} = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');

// Security Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Security Middleware Imprementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Others
app.use('/uploads', express.static(path.join(__dirname,"uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Rate Limiter
const limiter = rateLimit({windowMs:15*60*100,max:3000});
app.use(limiter);

// Form Id Able
// app.use(formidableMiddleware());
// Routes
readdirSync('./routes').map(r => app.use('/api/v1', require(`./routes/${r}`)));

// Mongoose Connection
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
        .then(()=>console.log('Database connected'))
        .catch((err)=>console.log('Database connection fail!'));

module.exports=app;
