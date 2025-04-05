import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopics } from '../services/dataService';

function TopicScreen() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const topicsData = getTopics();
      setTopics(topicsData);
    } catch (error) {
      console.error('Error loading topics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-secondary">⏳ 載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            ↩️ 返回主頁
          </button>
          <h2 className="text-3xl font-bold text-secondary-dark">
            📚 選擇題目
          </h2>
        </div>
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              onClick={() => navigate(`/game/${topic.name}`)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-secondary-dark mb-2">
                📌 {topic.name}
              </h3>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopicScreen; 