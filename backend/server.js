const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler'); // Import the error handling middleware
const app = express();

require('dotenv').config();

// Connect Database
connectDB();


// Init Middleware
app.use(cors(
    {
        origin:"*",
    }
));
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Error Handling Middleware
// app.use(errorHandler);

const PORT =  5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
