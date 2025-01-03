package com.nocturn.noctrun_taskflow.repositories;

import com.nocturn.noctrun_taskflow.models.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

}
