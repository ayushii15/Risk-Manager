import React from 'react';

const QuizForm = ({ questions, userAnswers, handleAnswerChange }) => {
  return (
    <form>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`question-${question.id}-option-${index}`}
                name={`question-${question.id}`}
                value={option.value}
                checked={userAnswers[question.id] === option.value}
                onChange={() => handleAnswerChange(question.id, option.value)}
              />
              <label htmlFor={`question-${question.id}-option-${index}`}>{option.value}</label>
            </div>
          ))}
        </div>
      ))}
    </form>
  );
};

export default QuizForm;
