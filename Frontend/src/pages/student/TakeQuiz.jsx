import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const TakeQuiz = () => {

  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const email = localStorage.getItem("studentEmail");

  // LOAD QUIZ
  useEffect(() => {

    fetch(`http://localhost:8080/quiz/${quizId}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data);
        setTimeLeft(data.duration * 60);
      });

  }, [quizId]);

  // TIMER
  useEffect(() => {

    if (!quiz || submitted) return;

    const timer = setInterval(() => {

      setTimeLeft(prev => {

        if (prev <= 1) {
          submitQuiz("time-up");
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [quiz, submitted]);

  // SUBMIT QUIZ
  const submitQuiz = useCallback((reason) => {

    if (!quiz) return;

    setSubmitted(true);

    let score = 0;

    const marksPerQ =
      quiz.questions.length > 0
        ? quiz.totalMarks / quiz.questions.length
        : 0;

    quiz.questions.forEach((q) => {

      if (answers[q.id] === q.correctIndex) {
        score += marksPerQ;
      }

    });

    const result = {
      studentEmail: email,
      quizId: quiz.id,
      score: Math.round(score)
    };

    fetch("http://localhost:8080/student/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    })
      .then(() => {
        toast.success("Quiz submitted");
        navigate("/student");
      })
      .catch(() => {
        toast.error("Submit failed");
      });

  }, [quiz, answers, email, navigate]);

  if (!quiz) return null;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (

    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          {quiz.title}
        </h2>

        <div className="text-red-500 font-bold">
          {formatTime(timeLeft)}
        </div>

      </div>

      {quiz.questions.map((q, index) => (

        <div key={q.id} className="mb-6">

          <p className="font-semibold mb-2">
            {index + 1}. {q.text}
          </p>

          {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, i) => (

            <label key={i} className="block">

              <input
                type="radio"
                name={q.id}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [q.id]: i
                  })
                }
              />

              {" "} {opt}

            </label>

          ))}

        </div>

      ))}

      <Button
        onClick={() => submitQuiz("manual")}
        className="bg-green-600 text-white"
      >
        Submit Quiz
      </Button>

    </div>

  );

};

export default TakeQuiz;