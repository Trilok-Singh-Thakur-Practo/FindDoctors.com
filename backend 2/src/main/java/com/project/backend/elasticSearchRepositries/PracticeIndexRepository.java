package com.project.backend.elasticSearchRepositries;

import com.project.backend.elasticSearchIndexes.PracticeIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface PracticeIndexRepository extends ElasticsearchRepository<PracticeIndex, Integer> {
    List<PracticeIndex> findByNameContainingIgnoreCaseOrSpecialityContainingIgnoreCase(String name, String speciality);
}
