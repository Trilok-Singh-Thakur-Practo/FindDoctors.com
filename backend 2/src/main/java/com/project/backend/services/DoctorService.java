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
import com.project.backend.DTOs.DoctorDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorIndexRepository doctorIndexRepository;
    private final DoctorRepository doctorRepository;
    private final SpecialityRepository specialityRepository;
    private final PracticeRepository practiceRepository;
    private final DoctorPracticeRepository doctorPracticeRepository;

    @Autowired
    public DoctorService(DoctorIndexRepository doctorIndexRepository, DoctorRepository doctorRepository,
                         SpecialityRepository specialityRepository, PracticeRepository practiceRepository,
                         DoctorPracticeRepository doctorPracticeRepository) {
        this.doctorIndexRepository = doctorIndexRepository;
        this.doctorRepository = doctorRepository;
        this.specialityRepository = specialityRepository;
        this.practiceRepository = practiceRepository;
        this.doctorPracticeRepository = doctorPracticeRepository;
    }

    @Transactional
    public ResponseEntity<DoctorDTO> addDoctor(Doctor doctor, Integer specialityId, List<Integer> practiceIds) {
        Speciality speciality = specialityRepository.findById(specialityId)
                .orElseThrow(() -> new RuntimeException("Speciality not found"));
        doctor.setSpeciality(speciality);

        Doctor savedDoctor = doctorRepository.save(doctor);

        List<Practice> practices = practiceRepository.findAllById(practiceIds);
        List<DoctorPractice> doctorPractices = practices.stream().map(practice -> {
            DoctorPractice doctorPractice = new DoctorPractice();
            doctorPractice.setDoctor(savedDoctor);
            doctorPractice.setPractice(practice);
            return doctorPractice;
        }).collect(Collectors.toList());

        doctorPracticeRepository.saveAll(doctorPractices);

        DoctorIndex doctorIndex = new DoctorIndex(
                savedDoctor.getDoctorId(),
                savedDoctor.getName(),
                savedDoctor.getSpeciality().getSpecialityName()
        );
        doctorIndexRepository.save(doctorIndex);

        DoctorDTO doctorDTO = convertToDTO(savedDoctor);
        return ResponseEntity.ok(doctorDTO);
    }

    public ResponseEntity<List<DoctorDTO>> searchByNameOrSpecialization(String query) {
        List<DoctorIndex> doctorIndexList = doctorIndexRepository.findByNameContainingIgnoreCaseOrSpecialityContainingIgnoreCase(query, query);
        List<Integer> doctorIds = doctorIndexList.stream().map(DoctorIndex::getDoctorId).collect(Collectors.toList());
        List<Doctor> doctors = doctorRepository.findAllById(doctorIds);
        List<DoctorDTO> doctorDTOs = doctors.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }

    public ResponseEntity<List<DoctorDTO>> searchAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorDTO> doctorDTOs = doctors.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }

    public ResponseEntity<?> getDoctorById(Integer doctorId) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
        if (optionalDoctor.isEmpty()) {
            return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
        }
        DoctorDTO doctorDTO = convertToDTO(optionalDoctor.get());
        return ResponseEntity.ok(doctorDTO);
    }

    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setDoctorId(doctor.getDoctorId());
        doctorDTO.setName(doctor.getName());
        doctorDTO.setEmail(doctor.getEmail());
        doctorDTO.setPhone(doctor.getPhone());
        doctorDTO.setConsultationFee(doctor.getConsultationFee());
        doctorDTO.setExperience(doctor.getExperience());
        doctorDTO.setQualifications(doctor.getQualifications());
        doctorDTO.setCity(doctor.getCity());
        doctorDTO.setBio(doctor.getBio());
        doctorDTO.setSpecialityName(doctor.getSpeciality().getSpecialityName());
        doctorDTO.setPracticeNames(doctor.getPractices().stream()
                .map(dp -> dp.getPractice().getName())
                .collect(Collectors.toList()));
        return doctorDTO;
    }
}
