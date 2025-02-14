package com.project.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Practice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int practiceId;

    private String name;
    private String address;
    private String city; // For city-based search
    private String phone;
    private String website;

    @ManyToOne
    @JoinColumn(name = "speciality_id", nullable = false) // Each practice has ONE speciality
    private Speciality speciality;

    @OneToMany(mappedBy = "practice", cascade = CascadeType.ALL)
    private List<DoctorPractice> doctors = new ArrayList<>();
}

