//server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const dbURI = "mongodb+srv://cindyhii007:q5aVWp8wMHAScEoV@cluster30.nbbark2.mongodb.net/TravelGenie?retryWrites=true&w=majority&appName=Cluster30";
mongoose
.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} and connected to MongoDb`);
    });
})
.catch((error) => {
  console.log("Unable to connect to Server and/or MongoDb");
})

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use route files
app.use('/api/manage-package', require('./routes/managePackage'));
app.use('/api/bookingPage', require('./routes/bookingPage'));
app.use('/api/report', require('./routes/report'));
app.use('/api/signUp', require('./routes/signUp'));
app.use('/api/login', require('./routes/login'));
app.use('/api/forgotPassword', require('./routes/forgotPassword'));
app.use('/api/resetPassword', require('./routes/resetPassword'));
app.use('/api/planning', require('./routes/planning'));
app.use("/api/schedule", require("./routes/schedule"));






