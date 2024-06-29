const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/group-chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
