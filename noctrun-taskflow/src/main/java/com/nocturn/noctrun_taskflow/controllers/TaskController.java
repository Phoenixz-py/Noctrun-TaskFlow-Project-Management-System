package com.nocturn.noctrun_taskflow.controllers;

import com.nocturn.noctrun_taskflow.models.Task;
import com.nocturn.noctrun_taskflow.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get a task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create-task")
    @PreAuthorize("hasRole('TEAM_LEAD') or hasRole('ADMIN')")
    public ResponseEntity<String> createTask(@RequestBody Task task) {
        // Validate input (e.g., title, deadline, etc.)
        if (task.getTitle() == null || task.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().body("Task title is required");
        }
        if (task.getDeadline() == null || task.getDeadline().before(new Date())) {
            return ResponseEntity.badRequest().body("Invalid or past deadline");
        }

        // Save the task to the database
        taskRepository.save(task);
        return ResponseEntity.ok("Task created successfully");
    }

    // Update a task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task updatedTask) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setStatus(updatedTask.getStatus());
            existingTask.setDeadline(updatedTask.getDeadline());
            existingTask.setPriority(updatedTask.getPriority());
            existingTask.setAssignedTo(updatedTask.getAssignedTo());
            return ResponseEntity.ok(taskRepository.save(existingTask));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id) {
        return taskRepository.findById(id).map(task -> {
            taskRepository.delete(task);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
