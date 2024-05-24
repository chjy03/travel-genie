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

//server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TravelGenie', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Use route files
app.use('/api/manage-package', require('./routes/managePackage'));
app.use('/api/bookingPage', require('./routes/bookingPage'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

