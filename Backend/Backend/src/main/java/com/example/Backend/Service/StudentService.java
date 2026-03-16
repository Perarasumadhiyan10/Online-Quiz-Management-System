package com.example.Backend.Service;

import com.example.Backend.Entity.Student;
import com.example.Backend.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    // REGISTER STUDENT
    public Student registerStudent(String email){

        if(studentRepository.findByEmail(email).isPresent()){
            throw new RuntimeException("Email already registered");
        }

        Student student = new Student();
        student.setEmail(email);

        return studentRepository.save(student);
    }

    // LOGIN STUDENT
    public Student loginStudent(String email){

        return studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not registered"));
    }

    // GET ALL STUDENTS (THIS WAS MISSING)
    public List<Student> getAllStudents(){

        return studentRepository.findAll();

    }
}