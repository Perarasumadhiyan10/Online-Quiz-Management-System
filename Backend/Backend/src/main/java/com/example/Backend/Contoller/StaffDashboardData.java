package com.example.Backend.Contoller;

public class StaffDashboardData {

    private long quizzesCreated;
    private long activeQuizzes;

    public StaffDashboardData(long quizzesCreated, long activeQuizzes){
        this.quizzesCreated = quizzesCreated;
        this.activeQuizzes = activeQuizzes;
    }

    public long getQuizzesCreated(){
        return quizzesCreated;
    }

    public long getActiveQuizzes(){
        return activeQuizzes;
    }
}