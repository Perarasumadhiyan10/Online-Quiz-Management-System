package com.example.Backend.Service;

import com.example.Backend.Entity.Staff;
import com.example.Backend.Repository.StaffRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public Staff addStaff(String name) {

        Staff staff = new Staff();
        staff.setName(name);
        staff.setApproved(false);

        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff approveStaff(Long id) {

        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        staff.setApproved(true);

        return staffRepository.save(staff);
    }

}