package com.project.backend.services;

import com.project.backend.DTOs.PracticeDTO;
import com.project.backend.elasticSearchIndexes.PracticeIndex;
import com.project.backend.elasticSearchRepositries.PracticeIndexRepository;
import com.project.backend.entities.Doctor;
import com.project.backend.entities.DoctorPractice;
import com.project.backend.entities.Practice;
import com.project.backend.entities.Speciality;
import com.project.backend.repositries.DoctorPracticeRepository;
import com.project.backend.repositries.DoctorRepository;
import com.project.backend.repositries.PracticeRepository;
import com.project.backend.repositries.SpecialityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PracticeService {

    private final PracticeIndexRepository practiceIndexRepository;
    private final PracticeRepository practiceRepository;
    private final SpecialityRepository specialityRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorPracticeRepository doctorPracticeRepository;

    @Autowired
    public PracticeService(PracticeIndexRepository practiceIndexRepository, PracticeRepository practiceRepository,
                           SpecialityRepository specialityRepository, DoctorRepository doctorRepository,
                           DoctorPracticeRepository doctorPracticeRepository) {
        this.practiceIndexRepository = practiceIndexRepository;
        this.practiceRepository = practiceRepository;
        this.specialityRepository = specialityRepository;
        this.doctorRepository = doctorRepository;
        this.doctorPracticeRepository = doctorPracticeRepository;
    }

    @Transactional
    public ResponseEntity<PracticeDTO> addPractice(Practice practice, Integer specialityId, List<Integer> doctorIds) {
        Speciality speciality = specialityRepository.findById(specialityId)
                .orElseThrow(() -> new RuntimeException("Speciality not found"));
        practice.setSpeciality(speciality);

        Practice savedPractice = practiceRepository.save(practice);
        List<Doctor> doctorList = doctorRepository.findAllById(doctorIds);

        List<DoctorPractice> doctorPractices = doctorList.stream().map(doctor -> {
            DoctorPractice doctorPractice = new DoctorPractice();
            doctorPractice.setDoctor(doctor);
            doctorPractice.setPractice(savedPractice);
            return doctorPractice;
        }).collect(Collectors.toList());

        doctorPracticeRepository.saveAll(doctorPractices);

        PracticeIndex practiceIndex = new PracticeIndex(
                savedPractice.getPracticeId(),
                savedPractice.getName(),
                savedPractice.getSpeciality().getSpecialityName()
        );
        practiceIndexRepository.save(practiceIndex);

        PracticeDTO practiceDTO = convertToDTO(savedPractice);
        return ResponseEntity.ok(practiceDTO);
    }

    public ResponseEntity<List<PracticeDTO>> searchByNameOrSpecialization(String query) {
        List<PracticeIndex> practiceIndexList = practiceIndexRepository.findByNameContainingIgnoreCaseOrSpecialityContainingIgnoreCase(query, query);
        List<Integer> practiceIds = practiceIndexList.stream().map(PracticeIndex::getPracticeId).collect(Collectors.toList());
        List<Practice> practiceList = practiceRepository.findAllById(practiceIds);

        List<PracticeDTO> practiceDTOs = practiceList.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(practiceDTOs);
    }

    public ResponseEntity<List<PracticeDTO>> getAllPractices() {
        List<Practice> practiceList = practiceRepository.findAll();

        List<PracticeDTO> practiceDTOs = practiceList.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(practiceDTOs);
    }

    public ResponseEntity<?> getPracticeById(Integer practiceId) {
        Optional<Practice> optionalPractice = practiceRepository.findById(practiceId);
        if (optionalPractice.isEmpty()) {
            return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
        }
        PracticeDTO practiceDTO = convertToDTO(optionalPractice.get());
        return ResponseEntity.ok(practiceDTO);
    }

    private PracticeDTO convertToDTO(Practice practice) {
        PracticeDTO practiceDTO = new PracticeDTO();
        practiceDTO.setPracticeId(practice.getPracticeId());
        practiceDTO.setName(practice.getName());
        practiceDTO.setCity(practice.getCity());
        practiceDTO.setAddress(practice.getAddress());
        practiceDTO.setWebsite(practice.getWebsite());
        practiceDTO.setPhone(practice.getPhone());
        practiceDTO.setSpecialityName(practice.getSpeciality().getSpecialityName());
        practiceDTO.setDoctorNames(practice.getDoctors().stream()
                .map(dp -> dp.getDoctor().getName())
                .collect(Collectors.toList()));
        return practiceDTO;
    }
}
