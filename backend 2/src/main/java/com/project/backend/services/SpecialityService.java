package com.project.backend.services;

import com.project.backend.entities.Speciality;
import com.project.backend.repositries.SpecialityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialityService {

    @Autowired
    private SpecialityRepository specialityRepository;

    public ResponseEntity<String> addSpeciality(Speciality speciality) {
        try {
            specialityRepository.save(speciality);
            return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
        }
        catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>("FAILURE", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getAllSpecialities() {
        List<Speciality> specialityList = specialityRepository.findAll();

        if(specialityList.isEmpty()){
            return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(specialityList, HttpStatus.OK);
    }
}
