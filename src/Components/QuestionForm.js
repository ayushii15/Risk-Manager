import React, { useState } from 'react';
import '../styles/QuestionForm.css'; // Assuming a CSS file for styling

const QuestionForm = ({ question, handleAnswerChange, handleNextQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (questionId, score) => {
    setSelectedOption(score);
    handleAnswerChange(questionId, score);
  };

  return (
    <div className="question-form-container">
      <div className="question-box">
        <h3 className="question-text">{question.question}</h3>
        <div className="options-container">
          {question.options.map((option) => (
            <div
              key={option.value}
              className={`option ${selectedOption === option.score ? 'selected' : ''}`}
              onClick={() => handleOptionChange(question.id, option.score)}
            >
              <input
                type="radio"
                id={`${question.id}-${option.value}`}
                name={`question-${question.id}`}
                value={option.value}
                checked={selectedOption === option.score}
                onChange={() => handleOptionChange(question.id, option.score)}
                hidden
              />
              <label htmlFor={`${question.id}-${option.value}`}>{option.value}</label>
            </div>
          ))}
        </div>
        <button
          className="next-btn"
          onClick={handleNextQuestion}
          disabled={!selectedOption}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
