package com.example.Backend.Contoller;

import com.example.Backend.Entity.Student;
import com.example.Backend.Entity.Quiz;
import com.example.Backend.Entity.Result;
import com.example.Backend.Repository.QuizRepository;
import com.example.Backend.Repository.ResultRepository;
import com.example.Backend.Service.StudentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController {

    private final StudentService studentService;
    private final QuizRepository quizRepository;
    private final ResultRepository resultRepository;

    public StudentController(
            StudentService studentService,
            QuizRepository quizRepository,
            ResultRepository resultRepository
    ){
        this.studentService = studentService;
        this.quizRepository = quizRepository;
        this.resultRepository = resultRepository;
    }

    // REGISTER STUDENT
    @PostMapping("/register")
    public Student register(@RequestBody Student student){
        return studentService.registerStudent(student.getEmail());
    }

    // LOGIN STUDENT
    @PostMapping("/login")
    public Student login(@RequestBody Student student){
        return studentService.loginStudent(student.getEmail());
    }

    // GET ALL QUIZZES
    @GetMapping("/quizzes")
    public List<Quiz> getQuizzes(){
        return quizRepository.findAll();
    }

    // GET STUDENT RESULTS
    @GetMapping("/results/{email}")
    public List<Result> getResults(@PathVariable String email){
        return resultRepository.findByStudentEmail(email);
    }

    // SUBMIT QUIZ RESULT
    @PostMapping("/submit")
    public Result submitQuiz(@RequestBody Result result){
        return resultRepository.save(result);
    }
}