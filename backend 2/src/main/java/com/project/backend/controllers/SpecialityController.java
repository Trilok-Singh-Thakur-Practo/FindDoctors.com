package com.project.backend.controllers;

import com.project.backend.entities.Speciality;
import com.project.backend.services.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/speciality")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access this controller
public class SpecialityController {

    @Autowired
    private SpecialityService specialityService;

    @PostMapping("/add-speciality")
    public ResponseEntity<String> addSpeciality(@RequestBody Speciality speciality){
        return specialityService.addSpeciality(speciality);
    }

    @GetMapping("/allSpecialities")
    public ResponseEntity<?> getAllSpecialities(){
        return specialityService.getAllSpecialities();
    }
}
