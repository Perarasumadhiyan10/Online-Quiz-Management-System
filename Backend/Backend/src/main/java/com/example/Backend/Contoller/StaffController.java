package com.example.Backend.Contoller;

import com.example.Backend.Entity.Staff;
import com.example.Backend.Entity.Question;
import com.example.Backend.Entity.Quiz;
import com.example.Backend.Entity.Result;
import com.example.Backend.Repository.StaffRepository;
import com.example.Backend.Repository.QuestionRepository;
import com.example.Backend.Repository.QuizRepository;
import com.example.Backend.Repository.ResultRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@CrossOrigin("*")
public class StaffController {

    private final StaffRepository staffRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final ResultRepository resultRepository;

    public StaffController(
            StaffRepository staffRepository,
            QuizRepository quizRepository,
            QuestionRepository questionRepository,
            ResultRepository resultRepository
    ) {
        this.staffRepository = staffRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.resultRepository = resultRepository;
    }

    // STAFF LOGIN
    @PostMapping("/login")
    public Staff login(@RequestBody Staff staff){

        Staff found = staffRepository.findByName(staff.getName())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        if(!found.isApproved()){
            throw new RuntimeException("Staff not approved by admin");
        }

        if(found.isDisabled()){
            throw new RuntimeException("Staff account disabled");
        }

        return found;
    }

    // STAFF DASHBOARD
    @GetMapping("/dashboard")
    public StaffDashboardData getDashboard(){

        long quizzesCreated = quizRepository.count();
        long activeQuizzes = quizRepository.countByActiveTrue();

        return new StaffDashboardData(quizzesCreated, activeQuizzes);
    }

    // CREATE QUIZ
    @PostMapping("/create-quiz")
    public Quiz createQuiz(@RequestBody Quiz quiz){
        return quizRepository.save(quiz);
    }

    // ADD QUESTION
    @PostMapping("/quiz/{quizId}/questions")
    public Question addQuestion(
            @PathVariable Long quizId,
            @RequestBody Question question
    ){
        question.setQuizId(quizId);
        return questionRepository.save(question);
    }

    // GET ALL RESULTS
    @GetMapping("/results")
    public List<Result> getResults(){
        return resultRepository.findAll();
    }

}