package com.project.backend.services;

import com.project.backend.elasticSearchIndexes.DoctorIndex;
import com.project.backend.elasticSearchRepositries.DoctorIndexRepository;
import com.project.backend.entities.Doctor;
import com.project.backend.entities.DoctorPractice;
import com.project.backend.entities.Practice;
import com.project.backend.entities.Speciality;
import com.project.backend.repositries.DoctorPracticeRepository;
import com.project.backend.repositries.DoctorRepository;
import com.project.backend.repositries.PracticeRepository;
import com.project.backend.repositries.SpecialityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    @Autowired
    private DoctorIndexRepository doctorIndexRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SpecialityRepository specialityRepository;

    @Autowired
    private PracticeRepository practiceRepository;

    @Autowired
    private DoctorPracticeRepository doctorPracticeRepository;

    public ResponseEntity<Doctor> addDoctor(Doctor doctor, Integer specialityId, List<Integer> practiceIds) {

        // Fetch the speciality by ID
        Speciality speciality = specialityRepository.findById(specialityId)
                .orElseThrow(() -> new RuntimeException("Speciality not found"));
        doctor.setSpeciality(speciality);

        // Fetch Practices
        List<Practice> practices = practiceRepository.findAllById(practiceIds);

        // Create DoctorPractice associations

        for (Practice practice : practices) {
            DoctorPractice doctorPractice = new DoctorPractice();
            doctorPractice.setDoctor(doctor);
            doctorPractice.setPractice(practice);
            doctorPracticeRepository.save(doctorPractice);
        }

        Doctor savedDoctor = doctorRepository.save(doctor);

        // Indexing into Elasticsearch
        DoctorIndex doctorIndex = new DoctorIndex(
                savedDoctor.getDoctorId(),
                savedDoctor.getName(),
                savedDoctor.getSpeciality().getSpecialityName()
        );
        doctorIndexRepository.save(doctorIndex);

        return ResponseEntity.ok(savedDoctor);

    }

    public ResponseEntity<List<Doctor>> searchByNameOrSpecialization(String query) {
        List<DoctorIndex> doctorIndexList = doctorIndexRepository.findByNameContainingIgnoreCaseOrSpecialityContainingIgnoreCase(query, query);

        // Step 2: Extract doctor IDs from Elasticsearch results
        List<Integer> doctorIds = doctorIndexList.stream()
                .map(DoctorIndex::getDoctorId)
                .collect(Collectors.toList());

        List<Doctor> doctorList = doctorRepository.findAllById(doctorIds);

        return ResponseEntity.ok(doctorList);
    }

    public ResponseEntity<List<Doctor>> searchAllDoctors() {
        List<Doctor> doctorList = doctorRepository.findAll();

        return ResponseEntity.ok(doctorList);
    }

    public ResponseEntity<?> getDoctorById(Integer doctorId) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);

        if(optionalDoctor.isEmpty()){
            return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(optionalDoctor.get(), HttpStatus.OK);
    }
}
