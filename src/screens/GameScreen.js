import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestions } from '../services/dataService';

function GameScreen() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  const playTune = (notes) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    const noteDuration = 0.2;
    const totalDuration = noteDuration * notes.length;

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      oscillator.connect(gainNode);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + (index * noteDuration));
      oscillator.start(audioContext.currentTime + (index * noteDuration));
      oscillator.stop(audioContext.currentTime + (index * noteDuration) + noteDuration);
    });

    // Fade out at the end
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + totalDuration);
  };

  useEffect(() => {
    try {
      const questionsData = getQuestions(topic);
      // Shuffle questions and take at most 10
      const shuffledQuestions = questionsData
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }, [topic]);

  const handleNextQuestion = useCallback((currentScore) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
      setScore(currentScore);
    } else {
      navigate('/finish', { state: { score: currentScore, totalQuestions: questions.length } });
    }
  }, [currentQuestionIndex, questions.length, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && currentQuestionIndex < questions.length) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion(score);
    }
  }, [timeLeft, currentQuestionIndex, questions.length, score, handleNextQuestion]);

  const handleAnswerSelect = (choice) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(choice);
    const newScore = choice.correct_answer ? score + 1 : score;
    
    // Play different tunes based on whether the answer is correct
    if (choice.correct_answer) {
      // C4 (do), D4 (re), E4 (mi) - ascending
      playTune([261.63, 293.66, 329.63]);
    } else {
      // E4 (mi), D4 (re), C4 (do) - descending
      playTune([329.63, 293.66, 261.63]);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setScore(newScore);
      } else {
        navigate('/finish', { state: { score: newScore, totalQuestions: questions.length } });
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-secondary">⏳ 載入中...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/topics')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            ↩️ 返回題目
          </button>
          <div className="text-xl font-semibold text-secondary-dark">
            🏆 分數: {score}
          </div>
          <div className="text-xl font-semibold text-secondary-dark">
            ⏱️ {timeLeft} 秒
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary-dark mb-4">
              {currentQuestion.title}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.choices.map((choice, index) => {
                // Split the value into Chinese characters and Jyutping
                const [chinese, jyutping] = choice.value.split(' ');
                // Split Jyutping into pronunciation and tone
                const [pronunciation, tone] = jyutping.replace(/[()]/g, '').split(/(\d+)/);
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(choice)}
                    disabled={selectedAnswer !== null}
                    className={`p-6 rounded-lg flex flex-col items-center justify-center transition-colors duration-200 ${
                      selectedAnswer === choice
                        ? choice.correct_answer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-4xl font-bold mb-2">{chinese}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xl text-blue-600">{pronunciation}</span>
                      <span className="text-xl text-purple-600">{tone}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen; 