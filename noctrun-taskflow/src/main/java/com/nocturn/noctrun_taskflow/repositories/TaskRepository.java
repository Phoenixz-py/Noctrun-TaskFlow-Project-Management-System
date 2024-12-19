package com.nocturn.noctrun_taskflow.repositories;

import com.nocturn.noctrun_taskflow.models.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    // Custom query methods
    List<Task> findByProjectId(String projectId);  // Find tasks by associated project ID
    List<Task> findByStatus(String status);        // Find tasks by status
}
