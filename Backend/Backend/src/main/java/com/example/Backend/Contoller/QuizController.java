package com.example.Backend.Contoller;

import com.example.Backend.Entity.Quiz;
import com.example.Backend.Repository.QuizRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    private final QuizRepository quizRepository;

    public QuizController(QuizRepository quizRepository){
        this.quizRepository = quizRepository;
    }

    // GET ALL QUIZZES
    @GetMapping
    public List<Quiz> getAllQuizzes(){
        return quizRepository.findAll();
    }

    // GET QUIZ BY ID
    @GetMapping("/{id}")
    public Quiz getQuiz(@PathVariable Long id){
        return quizRepository.findById(id).orElse(null);
    }
}