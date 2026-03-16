import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, CheckCircle } from "lucide-react";

const StudentDashboard = () => {

  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);

  const email = localStorage.getItem("studentEmail");

  useEffect(() => {

    fetch("http://localhost:8080/student/quizzes")
      .then(res => res.json())
      .then(data => setQuizzes(data));

    if(email){
      fetch(`http://localhost:8080/student/results/${email}`)
        .then(res => res.json())
        .then(data => setResults(data));
    }

  }, []);

  const getResultForQuiz = (quizId) => {
    return results.find(r => r.quizId === quizId);
  };

  return (
    <DashboardLayout role="student">

      <h2 className="text-2xl font-bold font-display mb-6">
        Available Quizzes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">

        {quizzes.map((quiz, i) => {

          const taken = getResultForQuiz(quiz.id);

          return (

            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5"
            >

              <h3 className="font-bold text-lg mb-2">
                {quiz.title}
              </h3>

              <div className="text-sm text-muted-foreground mb-4">
                <p>{quiz.duration} minutes</p>
                <p>Total marks: {quiz.totalMarks}</p>
              </div>

              {taken ? (

                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">

                  <CheckCircle className="h-4 w-4" />

                  Completed ({taken.score})

                </div>

              ) : (

                <Button
                  onClick={() => navigate(`/student/quiz/${quiz.id}`)}
                  className="w-full bg-cyan-400 text-white"
                >

                  <Play className="h-4 w-4 mr-1" />

                  Start Quiz

                </Button>

              )}

            </motion.div>

          );

        })}

        {quizzes.length === 0 && (
          <p className="text-muted-foreground">
            No quizzes available
          </p>
        )}

      </div>

      <h2 className="text-2xl font-bold font-display mb-4">
        My Results
      </h2>

      {results.length > 0 ? (

        <div className="glass-card rounded-xl overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4">Quiz ID</th>
                <th className="text-center p-4">Score</th>
              </tr>
            </thead>

            <tbody>

              {results.map((r) => (

                <tr key={r.id} className="border-b">

                  <td className="p-4">
                    {r.quizId}
                  </td>

                  <td className="p-4 text-center">
                    {r.score}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      ) : (

        <p className="text-muted-foreground">
          No results yet
        </p>

      )}

    </DashboardLayout>
  );
};

export default StudentDashboard;