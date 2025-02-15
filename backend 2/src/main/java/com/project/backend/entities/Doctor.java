package com.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.type.SpecialOneToOneType;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "doctor", uniqueConstraints = {@UniqueConstraint(columnNames = "email")}) // Ensure unique email
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorId;

    private String name;
    @Column(unique = true, nullable = false) // Ensure uniqueness at the column level
    private String email;
    private String phone;
    private double consultationFee;
    private int experience;
    private List<String> qualifications;
    private String city;    // For city-based search
    private String bio;

    @ManyToOne
    @JoinColumn(name = "speciality_id", nullable = false)
    private Speciality speciality;


    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonIgnore  // Prevent infinite recursion
    private List<DoctorPractice> practices = new ArrayList<>();
}

