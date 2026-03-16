package com.example.Backend.Repository;

import com.example.Backend.Entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    long countByActiveTrue();

}