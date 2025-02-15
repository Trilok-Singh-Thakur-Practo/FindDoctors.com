package com.project.backend.controllers;

import com.project.backend.DTOs.PracticeDTO;
import com.project.backend.entities.Doctor;
import com.project.backend.entities.Practice;
import com.project.backend.services.PracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access this controller
@RequestMapping("/practice")
public class PracticeController {

    @Autowired
    private PracticeService practiceService;

    @PostMapping("/add-practice")
    public ResponseEntity<PracticeDTO> addPractice(@RequestBody Practice practice, @RequestParam Integer specialityId, @RequestParam List<Integer> doctorIds){
        return practiceService.addPractice(practice, specialityId, doctorIds);
    }

    //search by name or specialization
    @GetMapping("/search")
    public ResponseEntity<List<PracticeDTO>> searchByNameOrSpecialization(@RequestParam String query){
        return practiceService.searchByNameOrSpecialization(query);
    }

    @GetMapping("/all-practices")
    public ResponseEntity<List<PracticeDTO>> getAllPractices(){
        return practiceService.getAllPractices();
    }

    @GetMapping("/{practiceId}")
    public ResponseEntity<?> getPracticeById(@PathVariable Integer practiceId){
        return practiceService.getPracticeById(practiceId);
    }
}
