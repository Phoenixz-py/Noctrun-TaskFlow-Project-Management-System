package com.nocturn.noctrun_taskflow.repositories;

import com.nocturn.noctrun_taskflow.models.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
}
