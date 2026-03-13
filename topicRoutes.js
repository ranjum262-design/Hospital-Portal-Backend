const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// 1. GET all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADD New Topic (Updated to handle router & notes array)
router.post('/', async (req, res) => {
  try {
    let data = req.body;
    
    // Notes ko array mein convert karne ka logic (Dashboard UI ke liye zaroori hai)
    if (data.notes && typeof data.notes === 'string') {
      data.notes = data.notes.split(',').map(note => note.trim());
    }

    const newTopic = new Topic(data);
    await newTopic.save();
    res.status(201).json({ message: "Topic added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. DELETE Topic
router.delete('/:id', async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: "Topic deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. UPDATE Full Topic (Add this to fix 404 error)
router.put('/:id', async (req, res) => {
  try {
    let data = req.body;

    // Notes ko array mein convert karna zaroori hai (Post logic ki tarah)
    if (data.notes && typeof data.notes === 'string') {
      data.notes = data.notes.split(',').map(note => note.trim());
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id, 
      data, 
      { new: true } // Isse updated data wapas milta hai
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic nahi mila" });
    }

    res.json(updatedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;