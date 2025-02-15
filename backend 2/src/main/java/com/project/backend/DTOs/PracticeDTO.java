package com.project.backend.DTOs;

import lombok.Data;
import java.util.List;

@Data
public class PracticeDTO {
    private int practiceId;
    private String name;
    private String address;
    private String city;
    private String phone;
    private String website;
    private String specialityName; // Include speciality name instead of full entity
    private List<String> doctorNames; // Only storing doctor names to avoid circular references
}
