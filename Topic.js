const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, 
  videoUrl: { type: String },                 
  notes: [{ type: String }],                  
  isCompleted: { type: Boolean, default: false }
});



module.exports = mongoose.model('Topic', TopicSchema, 'hospital_portal');