package com.project.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DoctorPractice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorPracticeId;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "practice_id")
    private Practice practice;

    private double consultationFee; //Extra field specific to this relation
}

