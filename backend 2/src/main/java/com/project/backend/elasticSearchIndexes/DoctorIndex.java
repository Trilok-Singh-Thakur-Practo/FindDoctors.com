package com.project.backend.elasticSearchIndexes;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Document(indexName = "doctor_index")
public class DoctorIndex {

    @Id
    private int doctorId;
    private String name;
    private String speciality;

    public DoctorIndex(Integer doctorId, String name, String speciality) {
        this.doctorId = doctorId;
        this.name = name;
        this.speciality = speciality;
    }
}

