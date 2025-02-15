package com.project.backend.elasticSearchIndexes;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Document(indexName = "practice_index")
public class PracticeIndex {
    @Id
    private int practiceId;
    private String name;
    private String speciality;

    public PracticeIndex(Integer practiceId, String name, String speciality) {
        this.practiceId = practiceId;
        this.name = name;
        this.speciality = speciality;
    }
}
