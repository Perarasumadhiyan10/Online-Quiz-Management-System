package com.example.Backend.Contoller;

public class DashboardData {

    private long totalStaff;
    private long totalStudents;
    private long totalResults;

    public DashboardData(long totalStaff, long totalStudents, long totalResults) {
        this.totalStaff = totalStaff;
        this.totalStudents = totalStudents;
        this.totalResults = totalResults;
    }

    public long getTotalStaff() {
        return totalStaff;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public long getTotalResults() {
        return totalResults;
    }
}