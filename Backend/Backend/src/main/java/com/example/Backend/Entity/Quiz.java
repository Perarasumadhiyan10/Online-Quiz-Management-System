package com.example.Backend.Entity;

import jakarta.persistence.*;

@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private int duration;

    private int totalMarks;

    private boolean active;   // ✅ ADD THIS FIELD

    public Quiz(){}

    public Long getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public int getDuration(){
        return duration;
    }

    public void setDuration(int duration){
        this.duration = duration;
    }

    public int getTotalMarks(){
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks){
        this.totalMarks = totalMarks;
    }

    public boolean isActive(){
        return active;
    }

    public void setActive(boolean active){
        this.active = active;
    }
}