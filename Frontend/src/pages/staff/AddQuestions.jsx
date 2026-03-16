import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const AddQuestions = () => {

  const { quizId } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleAdd = async () => {

    if (!text.trim()) {
      toast.error("Question text required");
      return;
    }

    if (options.some(o => !o.trim())) {
      toast.error("All options required");
      return;
    }

    const question = {
      text: text.trim(),
      optionA: options[0],
      optionB: options[1],
      optionC: options[2],
      optionD: options[3],
      correctIndex: correctIndex
    };

    try {

      await fetch(`http://localhost:8080/staff/quiz/${quizId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
      });

      toast.success("Question added");

      setText("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);

    } catch (err) {

      console.error(err);
      toast.error("Failed to add question");

    }

  };

  return (
    <DashboardLayout role="staff">

      <h2 className="text-2xl font-bold mb-6">
        Add Questions
      </h2>

      <div className="glass-card rounded-xl p-6 space-y-4 max-w-lg">

        <div>
          <Label>Question</Label>

          <Input
            className="mt-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter question"
          />
        </div>

        {options.map((opt, i) => (

          <div key={i} className="flex items-center gap-2">

            <input
              type="radio"
              name="correct"
              checked={correctIndex === i}
              onChange={() => setCorrectIndex(i)}
            />

            <Input
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                setOptions(newOpts);
              }}
              placeholder={`Option ${i + 1}`}
            />

          </div>

        ))}

        <Button onClick={handleAdd} className="w-full">

          <Plus className="h-4 w-4 mr-1" />
          Add Question

        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/staff")}
        >
          Done
        </Button>

      </div>

    </DashboardLayout>
  );
};

export default AddQuestions;