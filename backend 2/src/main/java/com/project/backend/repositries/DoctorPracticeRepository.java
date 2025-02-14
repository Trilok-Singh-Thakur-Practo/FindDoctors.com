package com.project.backend.repositries;

import com.project.backend.entities.DoctorPractice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorPracticeRepository extends JpaRepository<DoctorPractice, Integer> {
}
