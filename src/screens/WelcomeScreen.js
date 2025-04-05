import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-secondary-dark mb-2">
          🎯 粵語小測驗
        </h1>
        <p className="text-3xl text-secondary mb-2">
          📝 jyut6 jyu5 siu2 caak1 jim6
        </p>
        <br/><br></br>
        <p className="text-xl text-secondary mb-8">
          👶 小朋友嘅粵語測驗
        </p>
        <button
          onClick={() => navigate('/topics')}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full text-4xl transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          🚀 開始測驗
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen; 