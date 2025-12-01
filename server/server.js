const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection [cite: 216]
// Note: Replace process.env.MONGO_URI with your actual MongoDB Atlas string
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/career_advisor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// --- Mongoose Models (Based on ER Diagram [cite: 101]) ---

// Student Schema [cite: 109]
const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  location: String,
  languagePref: String,
  quizResults: Object
});
const Student = mongoose.model('Student', StudentSchema);

// College Schema [cite: 176]
const CollegeSchema = new mongoose.Schema({
  name: String,
  type: String, // Govt or Private
  location: String, // Geo-coordinates for Maps
  courses: [String],
  facilities: [String]
});
const College = mongoose.model('College', CollegeSchema);

// --- API Routes ---

// Get Colleges
app.get('/api/colleges', async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Quiz Result (AI Engine Placeholder) [cite: 96]
app.post('/api/recommend', async (req, res) => {
  const { aptitudeData } = req.body;
  // Simple logic to mock AI Recommendation Engine
  let recommendation = "Engineering";
  if (aptitudeData.preference === "People") recommendation = "Management";
  
  res.json({ careerPath: recommendation });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));