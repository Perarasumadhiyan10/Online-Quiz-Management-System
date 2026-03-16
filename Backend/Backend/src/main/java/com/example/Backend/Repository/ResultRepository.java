package com.example.Backend.Repository;

import com.example.Backend.Entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {

    // Get results by student email
    List<Result> findByStudentEmail(String studentEmail);

    // Get results by quiz id
    List<Result> findByQuizId(Long quizId);

}