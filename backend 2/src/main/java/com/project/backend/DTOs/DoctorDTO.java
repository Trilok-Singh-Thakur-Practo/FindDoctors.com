package com.project.backend.DTOs;

import lombok.Data;
import java.util.List;

@Data
public class DoctorDTO {
    private int doctorId;
    private String name;
    private String email;
    private String phone;
    private double consultationFee;
    private int experience;
    private List<String> qualifications;
    private String city;
    private String bio;
    private String specialityName;
    private List<String> practiceNames; // List of practice names
}

