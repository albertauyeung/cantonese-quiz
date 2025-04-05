import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function FinishScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-secondary-dark mb-6">
            🎉 測驗完成！
          </h2>
          
          <div className="mb-8">
            <div className="text-6xl font-bold text-primary mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-xl text-gray-600">
              {percentage}% 正確 ✅
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/topics')}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              🔄 試吓其他題目
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              🏠 返回主頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen; 