import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CreateQuiz = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("10");
  const [totalMarks, setTotalMarks] = useState("10");
  const [fullscreen, setFullscreen] = useState(true);
  const [proctoring, setProctoring] = useState(true);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    const quiz = {
      title: title.trim(),
      duration: parseInt(duration),
      totalMarks: parseInt(totalMarks),
      fullscreenEnforced: fullscreen,
      proctoringEnabled: proctoring,
      active: true
    };

    try {

      const res = await fetch("http://localhost:8080/staff/create-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quiz)
      });

      const savedQuiz = await res.json();

      toast.success("Quiz created! Now add questions.");

      navigate(`/staff/quiz/${savedQuiz.id}/questions`);

    } catch (error) {

      toast.error("Failed to create quiz");
      console.error(error);

    }

  };

  return (
    <DashboardLayout role="staff">

      <h2 className="text-2xl font-bold mb-6">
        Create Quiz
      </h2>

      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-xl p-6 max-w-lg space-y-5"
      >

        <div>
          <Label>Quiz Title</Label>

          <Input
            className="mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. JavaScript Fundamentals"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <Label>Duration (minutes)</Label>

            <Input
              className="mt-1"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <Label>Total Marks</Label>

            <Input
              className="mt-1"
              type="number"
              min="1"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
            />
          </div>

        </div>

        <div className="flex items-center justify-between">
          <Label>Fullscreen Enforcement</Label>
          <Switch
            checked={fullscreen}
            onCheckedChange={setFullscreen}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Proctoring</Label>
          <Switch
            checked={proctoring}
            onCheckedChange={setProctoring}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-teal-400 text-white text-lg"
        >
          Create & Add Questions
        </Button>

      </form>

    </DashboardLayout>
  );
};

export default CreateQuiz;