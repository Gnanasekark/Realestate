const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

app.use(cors());



dotenv.config();
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/enquiry', require('./routes/enquiry'));
app.use('/api/property', require('./routes/property')); 
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`));
