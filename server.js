const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes =  require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

//dot config
dotenv.config();

//MongoDB connection
connectDB();

//rest object
const app = express();  //All functionality of express gets stored in app

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
