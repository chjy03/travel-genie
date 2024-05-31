// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/TravelGenie', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// // Define the package schema and model
// const packageSchema = new mongoose.Schema({
//   id: String,
//   imgSrc: String,
//   name: String,
//   destination: String,
//   description: String,
//   price: Number
// });

// const Package = mongoose.model('Package', packageSchema);

// // Route to fetch all packages
// app.get('/packages', async (req, res) => {
//   try {
//     const packages = await Package.find();
//     res.json(packages);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: err.message });
//   }
// });

// // Use other route files if necessary
// app.use('/api/manage-package', require('./routes/managePackage'));
// app.use('/api/bookingPage', require('./routes/bookingPage'));

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//original version
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/TravelGenie')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Routes
// app.use('/api/manage-package', require('./routes/managePackage'));
// app.use('/api/bookingPage', require('./routes/bookingPage')); 

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// only one person connect mongodb
// mongoose.connect('mongodb://localhost:27017/TravelGenie', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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





