package com.nocturn.noctrun_taskflow.repositories;

import com.nocturn.noctrun_taskflow.models.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    // Custom query methods can be added here, such as:
    List<Project> findByName(String name);
}
