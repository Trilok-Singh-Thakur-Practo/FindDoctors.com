package com.project.backend.elasticSearchRepositries;

import com.project.backend.elasticSearchIndexes.DoctorIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface DoctorIndexRepository extends ElasticsearchRepository<DoctorIndex, Integer> {
    List<DoctorIndex> findByNameContainingIgnoreCaseOrSpecialityContainingIgnoreCase(String name, String speciality);
}
