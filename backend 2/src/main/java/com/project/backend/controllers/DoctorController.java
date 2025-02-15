package com.project.backend.controllers;

import com.project.backend.DTOs.DoctorDTO;
import com.project.backend.entities.Doctor;
import com.project.backend.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access this controller
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/add-doctor")
    public ResponseEntity<DoctorDTO> addDoctor(
            @RequestBody Doctor doctor,
            @RequestParam Integer specialityId,
            @RequestParam List<Integer> practiceIds
            ) {
        return doctorService.addDoctor(doctor, specialityId, practiceIds);
    }

    //search by name or specialization
    @GetMapping("/search")
    public ResponseEntity<List<DoctorDTO>> searchByNameOrSpecialization(@RequestParam String query){
        return doctorService.searchByNameOrSpecialization(query);
    }

    @GetMapping("/all-doctors")
    public ResponseEntity<List<DoctorDTO>> searchAllDoctors(){
        return doctorService.searchAllDoctors();
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<?> getDoctorById(@PathVariable Integer doctorId){
        return doctorService.getDoctorById(doctorId);
    }
}
