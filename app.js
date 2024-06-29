const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', groupRoutes);
app.use('/api', messageRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://divyanshutewari:3FTFVGF48Zlu13nN@cluster0.rt4350v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
}

module.exports = app;
