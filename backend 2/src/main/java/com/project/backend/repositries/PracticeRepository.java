package com.project.backend.repositries;

import com.project.backend.entities.Practice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PracticeRepository extends JpaRepository<Practice, Integer> {
}
