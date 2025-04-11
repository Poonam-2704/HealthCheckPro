import React, { useEffect, useState } from "react";
import "../Questions.css";
import { imageMap } from "../utils/imageImports";
import axios from "axios";

const categories = [
  {
    name: "Lifestyle",
    questions: [
      {
        question: "How often do you exercise?",
        image: "L1.jpg",
        options: [
          "Daily (1 hour)",
          "Weekly (2-3 times)",
          "Rarely (once a month)",
          "Never (not at all)",
        ],
        scores: [4, 3, 2, 1],
      },
      {
        question: "Do you smoke?",
        image: "L2.jpg",
        options: ["Yes, regularly", "No, never"],
        scores: [0, 5],
      },
      {
        question: "How many hours do you work per day?",
        image: "L3.jpg",
        options: [
          "Less than 4 hours",
          "4-6 hours",
          "6-8 hours",
          "More than 8 hours",
        ],
        scores: [4, 3, 2, 1],
      },
      {
        question: "Do you feel stressed frequently?",
        image: "L4.jpg",
        options: [
          "Yes, almost daily",
          "No, rarely",
          "Sometimes, in tough situations",
        ],
        scores: [1, 4, 2],
      },
      {
        question: "How many hours do you spend on screens daily?",
        image: "L5.jpg",
        options: [
          "Less than 2 hours",
          "2-4 hours",
          "4-6 hours",
          "More than 6 hours",
        ],
        scores: [4, 3, 2, 1],
      },
    ],
  },
  {
    name: "Food Habits",
    questions: [
      {
        question: "How many servings of vegetables do you eat per day?",
        image: "F1.jpg",
        options: [
          "0-1 servings",
          "2-3 servings",
          "4-5 servings",
          "More than 5 servings",
        ],
        scores: [1, 2, 3, 4],
      },
      {
        question: "Do you consume fast food often?",
        image: "F2.jpg",
        options: ["Yes, almost daily", "No, very rarely"],
        scores: [1, 5],
      },
      {
        question: "How much water do you drink daily?",
        image: "F3.jpg",
        options: [
          "Less than 1 liter",
          "1-2 liters",
          "2-3 liters",
          "More than 3 liters",
        ],
        scores: [1, 2, 3, 4],
      },
      {
        question: "How many meals do you eat per day?",
        image: "F4.jpg",
        options: ["1 meal", "2 meals", "3 meals", "More than 3 meals"],
        scores: [1, 2, 3, 4],
      },
      {
        question: "Do you consume sugary drinks daily?",
        image: "F5.jpg",
        options: [
          "Yes, every day",
          "No, never",
          "Occasionally, once in a while",
        ],
        scores: [1, 4, 2],
      },
    ],
  },
  {
    name: "Exercise",
    questions: [
      {
        question: "What type of exercise do you do most?",
        image: "E1.jpg",
        options: [
          "Cardio (running, cycling)",
          "Strength training (weights, resistance)",
          "Yoga and meditation",
          "None, I don't exercise",
        ],
        scores: [4, 4, 3, 1],
      },
      {
        question: "How long do you exercise per session?",
        image: "E2.jpg",
        options: [
          "Less than 15 minutes",
          "15-30 minutes",
          "30-45 minutes",
          "More than 45 minutes",
        ],
        scores: [1, 2, 3, 4],
      },
      {
        question: "How many days a week do you exercise?",
        image: "E3.jpg",
        options: ["0 days", "1-2 days", "3-4 days", "5 or more days"],
        scores: [1, 2, 3, 4],
      },
      {
        question: "Do you feel energetic after exercise?",
        image: "E4.jpg",
        options: [
          "Yes, very refreshed",
          "No, I feel exhausted",
          "Sometimes, depends on the workout",
        ],
        scores: [4, 1, 2],
      },
      {
        question: "Do you experience body pain due to lack of activity?",
        image: "E5.jpg",
        options: [
          "Yes, often",
          "No, not at all",
          "Occasionally, mild discomfort",
        ],
        scores: [1, 4, 2],
      },
    ],
  },
  {
    name: "Sleep Patterns",
    questions: [
      {
        question: "How many hours do you sleep per night?",
        image: "S1.jpg",
        options: [
          "Less than 4 hours",
          "4-6 hours",
          "6-8 hours",
          "More than 8 hours",
        ],
        scores: [1, 2, 4, 3],
      },
      {
        question: "Do you have trouble falling asleep?",
        image: "S2.jpg",
        options: [
          "Yes, every night",
          "No, I sleep easily",
          "Sometimes, on stressful days",
        ],
        scores: [1, 4, 2],
      },
      {
        question: "Do you wake up feeling refreshed?",
        image: "S3.jpg",
        options: [
          "Yes, always",
          "No, I wake up tired",
          "Sometimes, depends on sleep quality",
        ],
        scores: [4, 1, 2],
      },
      {
        question: "Do you use electronic devices before bed?",
        image: "S4.jpg",
        options: ["Yes, always", "No, I avoid screens at night"],
        scores: [1, 4],
      },
      {
        question: "How often do you wake up during the night?",
        image: "S5.jpg",
        options: ["Never, I sleep through", "1-2 times", "3 or more times"],
        scores: [4, 2, 1],
      },
    ],
  },
  {
    name: "Mental Well-being",
    questions: [
      {
        question: "How often do you feel anxious or stressed?",
        image: "M1.jpg",
        options: [
          "Daily, all the time",
          "Weekly, occasionally",
          "Rarely, only in tough situations",
          "Never, I am stress-free",
        ],
        scores: [1, 2, 3, 4],
      },
      {
        question: "Do you engage in relaxation techniques?",
        image: "M2.jpg",
        options: [
          "Yes, regularly (meditation, breathing exercises)",
          "No, never",
          "Sometimes, when needed",
        ],
        scores: [4, 1, 2],
      },
      {
        question: "Do you feel socially connected with friends/family?",
        image: "M3.jpg",
        options: [
          "Yes, always in touch",
          "No, I feel isolated",
          "Occasionally, when I have time",
        ],
        scores: [4, 1, 2],
      },
      {
        question: "How would you rate your overall happiness?",
        image: "M4.jpg",
        options: [
          "Very unhappy (1)",
          "Somewhat unhappy (2)",
          "Neutral (3)",
          "Happy (4)",
          "Very happy (5)",
        ],
        scores: [1, 2, 3, 4, 5],
      },
      {
        question: "Do you struggle with focus and concentration?",
        image: "M5.jpg",
        options: [
          "Yes, I get distracted easily",
          "No, I am very focused",
          "Sometimes, depending on my mood",
        ],
        scores: [1, 4, 2],
      },
    ],
  },
];



const Questions = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const totalQuestionsCount = categories.reduce(
    (sum, category) => sum + category.questions.length,
    0
  );

  useEffect(() => {
    currentCategory.questions.forEach(q => {
      const imgKey = q.image.replace('.jpg', '');
      if (!imageMap[imgKey]) {
        console.error(`Missing image: ${q.image}`);
      }
    });
    const answeredQuestions =
      currentCategoryIndex * categories[0].questions.length +
      currentQuestionIndex;
    const newProgress = (answeredQuestions / totalQuestionsCount) * 100;
    setProgress(newProgress);
  }, [currentCategoryIndex, currentQuestionIndex, totalQuestionsCount]);

  const totalScore = categories.reduce((sum, category) => {
    return (
      sum +
      category.questions.reduce((categorySum, question) => {
        return categorySum + Math.max(...question.scores);
      }, 0)
    );
  }, 0);

  const handleAnswerChange = (question, answer, scoreValue) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
    setScore((prev) => prev + scoreValue);
    setShowAlert(false);
  };

  const goToNextQuestion = () => {
    const category = categories[currentCategoryIndex];
    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsCompleted(true);
    
      axios
        .post("http://localhost:5000/api/save-score", {
          score: score,
          totalScore: totalScore,
        })
        .then((res) => {
          console.log("Score saved:", res.data);
        })
        .catch((err) => {
          console.error("Error saving score:", err);
        });
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentCategoryIndex > 0) {
      const prevCategory = categories[currentCategoryIndex - 1];
      setCurrentCategoryIndex((prev) => prev - 1);
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    }
  };

  const handleNextClick = () => {
    if (!answers[currentQuestion.question]) {
      setShowAlert(true);
      return;
    }
    goToNextQuestion();
  };
 
  if (isCompleted) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", justifyContent: "center" }}
      >
        <h2>Assessment Completed!</h2>
        <p>Thank you for your responses.</p>
        <p>
          Your score: {score} out of {totalScore}
        </p>
        <button onClick={() => window.location.href = "/"} className="home-button">
        Go to Home
      </button>
      <button onClick={() => window.location.href = "/results"} className="health-report-button">
    Check My Health Report
</button>

      </div>
    );
  }
  

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  if (!currentCategory || !currentQuestion) {
    return (
      <div className="container">
        <h2>Assessment Completed!</h2>
        <p>Thank you for your responses.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {showAlert && (
        <div className="custom-alert-overlay">
          <div className="custom-alert">
            <h3>Please Select an Option</h3>
            <p>You need to select an answer before proceeding.</p>
            <button onClick={() => setShowAlert(false)}>OK</button>
          </div>
        </div>
      )}

      <div className="tracker">
        <CategoryProgressBar categories={categories} progress={progress} />
      </div>
      <h3 className="category-name">{currentCategory.name}</h3>
      <div className="question-layout-container">
        {/* Image on the left */}
        <div className="image-column">
          <div className="question-image-container">
            <img 
              src={imageMap[currentQuestion.image.replace('.jpg', '')]} 
              alt={currentQuestion.question}
              className="question-image"
              onError={(e) => {
                e.target.src = '/placeholder.png';
                e.target.alt = 'Placeholder image';
              }}
            />
          </div>
        </div>

        {/* Content on the right */}
        <div className="content-column">
          

          <div className="question-text-container">
            <p id="questionP">{currentQuestion.question}</p>
          </div>

    
          <div className="options-scroll-container">
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={`${currentQuestion.question}-${option}`}
                  className="option-radio"
                >
                  <input
                    type="radio"
                    name={currentQuestion.question}
                    value={option}
                    checked={answers[currentQuestion.question] === option}
                    onChange={() =>
                      handleAnswerChange(
                        currentQuestion.question,
                        option,
                        currentQuestion.scores[index]
                      )
                    }
                  />
                  <span className="option-text">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button
              onClick={goToPreviousQuestion}
              disabled={
                currentCategoryIndex === 0 && currentQuestionIndex === 0
              }
            >
              Previous
            </button>
            <button onClick={handleNextClick}>
              {currentCategoryIndex === categories.length - 1 &&
              currentQuestionIndex === currentCategory.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryProgressBar = ({ categories, progress }) => {
  const totalDots = categories.length > 0 ? categories.length + 1 : 1;
  const divisor = totalDots - 1 || 1;

  return (
    <div className="category-progress-bar">
      <div className="progress-line">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="category-dots">
        {Array.from({ length: totalDots }, (_, index) => {
          const dotPosition = index * (100 / divisor);
          const isActive = dotPosition <= progress;

          return (
            <div
              key={index}
              className={`category-dot ${isActive ? "active" : ""}`}
              style={{ left: `${dotPosition}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Questions;