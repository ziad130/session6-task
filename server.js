
const express = require('express');
const connectDB = require('./db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const book = require('./models/Book');
const user = require('./models/User');

 
const app = express();
app.use(express.json());

connectDB();

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
