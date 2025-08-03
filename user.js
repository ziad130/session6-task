const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'customer', 'doctor', 'patient'], // add/remove roles as needed
    default: 'customer'
  },
  phone: String,
  favBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
  // You can add more fields like gender, photo, age, etc.
});

module.exports = mongoose.model('User', userSchema);