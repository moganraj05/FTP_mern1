const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bmiSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number,
    required: true
  },
  category: { 
    type: String, 
    required: true 
  },
  user_id:{
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Bmi', bmiSchema);
