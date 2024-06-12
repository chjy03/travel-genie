const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('config');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Get the MongoDB URI from environment variables
// const db = process.env.MONGO_URI;
const db = config.get('mongoURI');
const jwtSecret = config.get('jwtSecret');

console.log('MongoDB URI:', db);
console.log('JWT Secret:', jwtSecret);

if (!db || !jwtSecret) {
    console.error('MongoDB URI or JWT Secret is not defined.');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error('Unable to connect to Server and/or MongoDb', err);
        process.exit(1);
    });

// Define routes
app.use('/api/manage-package', require('./routes/managePackage'));
app.use('/api/bookingPage', require('./routes/bookingPage'));
app.use('/api/report', require('./routes/report'));
app.use('/api/signUp', require('./routes/signUp'));
app.use('/api/login', require('./routes/login'));
app.use('/api/forgotPassword', require('./routes/forgotPassword'));
app.use('/api/resetPassword', require('./routes/resetPassword'));
app.use('/api/planning', require('./routes/planning'));
app.use("/api/schedule", require("./routes/schedule"));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/userData', require('./routes/userData'));

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//original version
// //server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const ManagePackage = require('./models/ManagePackage');

// // Connect to express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// const dbURI = "mongodb+srv://cindyhii007:q5aVWp8wMHAScEoV@cluster30.nbbark2.mongodb.net/TravelGenie?retryWrites=true&w=majority&appName=Cluster30";
// mongoose.connect(dbURI)
// // .connect(dbURI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // })
// .then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT} and connected to MongoDb`);
//     });

//     // Ensure the unique index is created
//     const createUniqueIndex = async () => {
//       try {
//           await ManagePackage.init();
//           console.log('Unique index created for the id field.');
//       } catch (error) {
//           console.error('Error creating unique index:', error);
//       }
//   };

//   createUniqueIndex();
  
// })
// .catch((error) => {
//   console.log("Unable to connect to Server and/or MongoDb");
// })

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Use route files
// app.use('/api/manage-package', require('./routes/managePackage'));
// app.use('/api/bookingPage', require('./routes/bookingPage'));
// app.use('/api/report', require('./routes/report'));
// app.use('/api/signUp', require('./routes/signUp'));
// app.use('/api/login', require('./routes/login'));
// app.use('/api/forgotPassword', require('./routes/forgotPassword'));
// app.use('/api/profile', require('./routes/profile'));


//third version with log shown
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb+srv://cindyhii007:q5aVWp8wMHAScEoV@cluster30.nbbark2.mongodb.net/TravelGenie?retryWrites=true&w=majority&appName=Cluster30', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// const packageSchema = new mongoose.Schema({
//     imgSrc: String,
//     title: String,
//     description: String,
//     price: Number,
//     dayDuration: Number,
//     nightDuration: Number,
//     location: String,
//     dateRanges: [{ startDate: Date, endDate: Date }],
//     itinerary: [String],
// });

// const Package = mongoose.model('Package', packageSchema);

// app.get('/api/manage-package/search', async (req, res) => {
//     console.log('Received search request');
//     let { destination, date, maxPrice } = req.query;
//     console.log('Query Params:', { destination, date, maxPrice });

//     try {
//         if (!destination || !date || !maxPrice) {
//             return res.status(400).json({ message: 'Invalid parameters' });
//         }

//         // Trim newline characters and sanitize inputs
//         destination = destination.trim();
//         date = date.trim();
//         maxPrice = maxPrice.trim();
//         const parsedMaxPrice = Number(maxPrice);

//         if (isNaN(parsedMaxPrice)) {
//             return res.status(400).json({ message: 'Invalid price format' });
//         }

//         const searchDate = new Date(date);
//         if (isNaN(searchDate)) {
//             return res.status(400).json({ message: 'Invalid date format' });
//         }

//         const query = {
//             location: { $regex: destination, $options: 'i' },
//             'dateRanges.startDate': { $lte: searchDate },
//             'dateRanges.endDate': { $gte: searchDate },
//             price: { $lte: parsedMaxPrice },
//         };
//         console.log('Constructed Query:', JSON.stringify(query, null, 2));

//         const packages = await Package.find(query);
//         console.log('Packages Found:', packages.length);
//         if (packages.length === 0) {
//             return res.status(404).json({ message: 'Package not found' });
//         }
//         res.json(packages);
//     } catch (error) {
//         console.error('Error fetching packages:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.use('/api/bookingPage', require('./routes/bookingPage'));

// app.listen(port, () => {
//     console.log(`Server running on port ${port} and connected to MongoDb`);
// });

//search ok but packagelisitng not ok
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = 5001;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb+srv://cindyhii007:q5aVWp8wMHAScEoV@cluster30.nbbark2.mongodb.net/TravelGenie?retryWrites=true&w=majority&appName=Cluster30', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// const packageSchema = new mongoose.Schema({
//     imgSrc: String,
//     title: String,
//     description: String,
//     price: Number,
//     dayDuration: Number,
//     nightDuration: Number,
//     location: String,
//     dateRanges: [{ startDate: Date, endDate: Date }],
//     itinerary: [String],
// });

// const Package = mongoose.model('Package', packageSchema);

// app.get('/api/manage-package/search', async (req, res) => {
//     console.log('Received search request');
//     let { destination, date, maxPrice } = req.query;
//     console.log('Query Params:', { destination, date, maxPrice });

//     try {
//         if (!destination || !date || !maxPrice) {
//             return res.status(400).json({ message: 'Invalid parameters' });
//         }

//         // Trim newline characters and sanitize inputs
//         destination = destination.trim();
//         date = date.trim();
//         maxPrice = maxPrice.trim();
//         const parsedMaxPrice = Number(maxPrice);

//         if (isNaN(parsedMaxPrice)) {
//             return res.status(400).json({ message: 'Invalid price format' });
//         }

//         const searchDate = new Date(date);
//         if (isNaN(searchDate)) {
//             return res.status(400).json({ message: 'Invalid date format' });
//         }

//         // Constructing the query
//         const query = {
//             location: { $regex: destination, $options: 'i' },
//             'dateRanges.startDate': { $lte: searchDate },
//             'dateRanges.endDate': { $gte: searchDate },
//             price: { $lte: parsedMaxPrice },
//         };
//         console.log('Constructed Query:', JSON.stringify(query, null, 2));

//         // Finding packages based on the query
//         const packages = await Package.find(query);
//         console.log('Packages Found:', packages);

//         if (packages.length === 0) {
//             return res.status(404).json({ message: 'Package not found' });
//         }
//         res.json(packages);
//     } catch (error) {
//         console.error('Error fetching packages:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
// app.use('/api/bookingPage', require('./routes/bookingPage'));

// app.listen(port, () => {
//     console.log(`Server running on port ${port} and connected to MongoDb`);
// });


//another version
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Connect to express app
// const app = express();
// const PORT = process.env.PORT || 5001;

// // Connect to MongoDB
// const dbURI = "mongodb+srv://cindyhii007:q5aVWp8wMHAScEoV@cluster30.nbbark2.mongodb.net/TravelGenie?retryWrites=true&w=majority&appName=Cluster30";
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT} and connected to MongoDb`);
//     });
//   })
//   .catch((error) => {
//     console.log("Unable to connect to Server and/or MongoDb", error);
//   });

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Use route files
// app.use('/api/manage-package', require('./routes/managePackage'));
// app.use('/api/bookingPage', require('./routes/bookingPage'));
// app.use('/api/report', require('./routes/report'));
// app.use('/api/signUp', require('./routes/signUp'));
// app.use('/api/login', require('./routes/login'));
// app.use('/api/forgotPassword', require('./routes/forgotPassword'));
// app.use('/api/profile', require('./routes/profile'));


//another version
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = 5001;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb+srv://cindyhii007:q5aVWp8wMHAScEoV@cluster30.nbbark2.mongodb.net/TravelGenie?retryWrites=true&w=majority&appName=Cluster30', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Import route file
// const managePackageRoute = require('./routes/managePackage');
// app.use('/api/manage-package', managePackageRoute);
// app.use('/api/bookingPage', require('./routes/bookingPage'));

// app.listen(port, () => {
//     console.log(`Server running on port ${port} and connected to MongoDB`);
// });
