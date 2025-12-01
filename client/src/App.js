import React, { useState, useEffect } from 'react';
import './index.css';

// --- Components ---

const Navbar = () => (
  <nav className="navbar">
    <div className="brand">CareerAdvisor</div>
    <div>
      <button className="btn btn-outline">Login</button>
    </div>
  </nav>
);

// Aptitude Quiz Module [cite: 174, 195]
const AptitudeQuiz = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const questions = [
    { q: "Do you prefer working with numbers or people?", options: ["Numbers", "People", "Both"] },
    { q: "Do you enjoy solving technical problems?", options: ["Yes", "No", "Sometimes"] },
    { q: "Are you interested in how machines work?", options: ["Very", "A little", "Not at all"] }
  ];

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Mock AI calculation
      onComplete({ profile: "The Analyst", career: "Data Science" });
    }
  };

  return (
    <div className="quiz-container">
      <h3>Question {step + 1}/{questions.length}</h3>
      <p style={{fontSize: '1.2rem', margin: '20px 0'}}>{questions[step].q}</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {questions[step].options.map((opt) => (
          <button key={opt} onClick={handleAnswer} className="btn btn-outline">{opt}</button>
        ))}
      </div>
    </div>
  );
};

// Dashboard Module [cite: 197-205]
const Dashboard = ({ result }) => (
  <div className="container">
    <h2 style={{marginTop: '2rem'}}>Welcome Back, Student</h2>
    
    <div className="card-grid">
      {/* Quiz Result */}
      <div className="card">
        <h3>Your Profile</h3>
        <p className="brand">{result.profile}</p>
        <p>Recommended Path: <strong>{result.career}</strong></p>
      </div>

      {/* College Directory Teaser */}
      <div className="card">
        <h3>Recommended Colleges</h3>
        <ul>
          <li>IIT Kanpur (Govt)</li>
          <li>HBTU Kanpur (Govt)</li>
          <li>IIMT University (Meerut)</li>
        </ul>
        <button className="btn btn-primary" style={{marginTop: '10px'}}>View Full Directory</button>
      </div>

      {/* Timeline Tracker [cite: 177] */}
      <div className="card" style={{borderTopColor: '#dc2626'}}>
        <h3>Upcoming Deadlines 🔔</h3>
        <p>🔴 JEE Mains Registration: <strong>Nov 30</strong></p>
        <p>🟡 UP Scholarship: <strong>Dec 15</strong></p>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  const [view, setView] = useState('landing');
  const [quizResult, setQuizResult] = useState(null);

  return (
    <div>
      <Navbar />
      
      {view === 'landing' && (
        <header className="hero">
          <div className="container">
            <h1>Find Your Perfect <span style={{color: '#2563eb'}}>Career Path</span></h1>
            <p style={{fontSize: '1.2rem', color: '#666', marginBottom: '2rem'}}>
              Bridge the gap. Discover streams, government colleges, and scholarships.
            </p>
            <button className="btn btn-primary" onClick={() => setView('quiz')}>Take Aptitude Quiz</button>
            <button className="btn btn-outline">Explore Colleges</button>
          </div>
        </header>
      )}

      {view === 'quiz' && (
        <AptitudeQuiz onComplete={(res) => {
          setQuizResult(res);
          setView('dashboard');
        }} />
      )}

      {view === 'dashboard' && <Dashboard result={quizResult} />}

      <footer style={{textAlign: 'center', padding: '2rem', background: '#333', color: 'white', marginTop: '4rem'}}>
        <p>Project By: Priyanshu Mishra, Raj Vaibhav Tiwari, Shivanshu Dwivedi</p>
        <small>Department of CSE | IIMT University [cite: 7-10]</small>
      </footer>
    </div>
  );
}

export default App;