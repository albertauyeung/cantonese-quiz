import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import TopicScreen from './screens/TopicScreen';
import GameScreen from './screens/GameScreen';
import FinishScreen from './screens/FinishScreen';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="min-h-screen bg-primary-light">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/topics" element={<TopicScreen />} />
          <Route path="/game/:topic" element={<GameScreen />} />
          <Route path="/finish" element={<FinishScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 