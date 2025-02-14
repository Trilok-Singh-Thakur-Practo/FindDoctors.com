package com.project.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Speciality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int specialityId;

    @Column(unique = true, nullable = false)
    private String specialityName;
}

