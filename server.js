const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongodb');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse incoming requests as JSON
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Allowing only your React app origin
  methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
  credentials: true // Allow cookies or authentication headers
})); 


// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);





// Root route
app.get('/', (req, res) => {
  res.send('Library Management API is running');
});

// Set the port to listen on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const dotenv = require('dotenv');
// const { connectDB } = require('./config/mongodb'); // MongoDB connection for books
// const sequelize = require('./config/postgresql'); // PostgreSQL connection for users and transactions
// const bookRoutes = require('./routes/bookRoutes');  // Book routes (MongoDB)
// const userRoutes = require('./routes/userRoutes');  // User routes (PostgreSQL)
// const transactionRoutes = require('./routes/transactionRoutes'); // Transaction routes (PostgreSQL)
// const cors = require('cors');

// // Load environment variables
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Middleware to parse JSON requests
// app.use(express.json());
// app.use(cors());  // Enable CORS for frontend requests

// // Connect to MongoDB
// connectDB();

// // Connect to PostgreSQL
// sequelize.authenticate()
//   .then(() => {
//     console.log('PostgreSQL connected');
//     sequelize.sync();  // Sync Sequelize models with PostgreSQL tables
//   })
//   .catch((err) => console.log('PostgreSQL connection error:', err));

// // Root route
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // API routes
// app.use('/api/books', bookRoutes);         // MongoDB routes for books
// app.use('/api/users', userRoutes);         // PostgreSQL routes for users
// app.use('/api/transactions', transactionRoutes);  // PostgreSQL routes for transactions

// // Error handling middleware (optional, for better error reporting)
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message || 'Server error' });
// });

// // Define PORT and start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
