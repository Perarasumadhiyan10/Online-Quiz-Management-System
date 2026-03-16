package com.example.Backend.Contoller;

import com.example.Backend.Entity.Staff;
import com.example.Backend.Entity.Student;
import com.example.Backend.Entity.Result;
import com.example.Backend.Service.StaffService;
import com.example.Backend.Service.StudentService;
import com.example.Backend.Repository.ResultRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    private final StaffService staffService;
    private final StudentService studentService;
    private final ResultRepository resultRepository;

    public AdminController(
            StaffService staffService,
            StudentService studentService,
            ResultRepository resultRepository
    ){
        this.staffService = staffService;
        this.studentService = studentService;
        this.resultRepository = resultRepository;
    }

    // ADMIN DASHBOARD DATA
    @GetMapping("/dashboard")
    public DashboardData getDashboard(){

        long totalStaff = staffService.getAllStaff().size();
        long totalStudents = studentService.getAllStudents().size();
        long totalResults = resultRepository.count();

        return new DashboardData(totalStaff,totalStudents,totalResults);
    }

    // ADD STAFF
    @PostMapping("/add-staff")
    public Staff addStaff(@RequestBody Staff staff){

        return staffService.addStaff(staff.getName());

    }

    // GET ALL STAFF
    @GetMapping("/staff")
    public List<Staff> getStaff(){

        return staffService.getAllStaff();

    }

    // APPROVE STAFF
    @PutMapping("/approve/{id}")
    public Staff approveStaff(@PathVariable Long id){

        return staffService.approveStaff(id);

    }

    // GET ALL STUDENTS
    @GetMapping("/students")
    public List<Student> getStudents(){

        return studentService.getAllStudents();

    }

    // GET VIOLATION LOGS
    @GetMapping("/violations")
    public List<Result> getViolations(){

        return resultRepository.findAll();

    }
}