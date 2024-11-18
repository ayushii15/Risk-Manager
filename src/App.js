import React, { useState, useEffect } from 'react';
import RiskAnalysisDisplay from './Components/RiskAnalysisDisplay';
import QuestionForm from './Components/QuestionForm';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [isRiskAnalysisReady, setIsRiskAnalysisReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://assesment-server-umber.vercel.app/risk-questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleAnswerChange = (questionId, score) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: score,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore(); // Calculate score when the last question is answered
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(userAnswers).reduce((acc, score) => acc + score, 0);
    setUserScore(totalScore);
    sendScoreToApi(totalScore);
  };

  const sendScoreToApi = (score) => {
    fetch('https://assesment-server-umber.vercel.app/calculate-risk-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userScore: score }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Risk analysis response:', data); // Debugging
        if (data && data.data) {
          setRiskAnalysis(data); // Update riskAnalysis state
          setIsRiskAnalysisReady(true); // Show Risk Analysis page
        } else {
          throw new Error('Invalid response data format');
        }
      })
      .catch((error) => {
        console.error('Error submitting score:', error);
        setError('Failed to submit score. Please try again later.');
      });
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Risk Assessment Quiz</h1>
      {isRiskAnalysisReady ? (
        riskAnalysis && riskAnalysis.data ? (
          <RiskAnalysisDisplay key={riskAnalysis.data.risk_score} data={riskAnalysis.data} />
        ) : (
          <p>Calculating risk...</p>
        )
      ) : (
        <QuestionForm
          question={questions[currentQuestionIndex]}
          handleAnswerChange={handleAnswerChange}
          handleNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default App;
