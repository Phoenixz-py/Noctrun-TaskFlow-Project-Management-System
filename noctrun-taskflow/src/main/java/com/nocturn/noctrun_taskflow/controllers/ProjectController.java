package com.nocturn.noctrun_taskflow.controllers;

import com.nocturn.noctrun_taskflow.models.Project;
import com.nocturn.noctrun_taskflow.models.User;
import com.nocturn.noctrun_taskflow.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.nocturn.noctrun_taskflow.repositories.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    // Get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll(); // Use findAll() method from JpaRepository
    }

    // Get a project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        return projectRepository.findById(id) // Use findById() method from JpaRepository
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new project
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project); // Use save() method from JpaRepository
    }

    // Update a project
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project updatedProject) {
        return projectRepository.findById(id).map(existingProject -> {
            existingProject.setName(updatedProject.getName());
            existingProject.setDescription(updatedProject.getDescription());
            existingProject.setStartDate(updatedProject.getStartDate());
            existingProject.setEndDate(updatedProject.getEndDate());
            return ResponseEntity.ok(projectRepository.save(existingProject)); // Use saveAndFlush() to update and persist changes
        }).orElse(ResponseEntity.notFound().build());
    }


    @Autowired
    private UserRepository userRepository;
    @PostMapping("/{projectId}/assign/{userId}")
    @PreAuthorize("hasRole('TEAM_LEAD') or hasRole('ADMIN')")
    public ResponseEntity<String> assignUserToProject(@PathVariable String projectId, @PathVariable String userId) {
        // Fetch the project by ID
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }

        // Fetch the user by ID
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Assign the user to the project
        Project project = optionalProject.get();

        if (project.getTeamIds() == null) {
            project.setTeamIds(new ArrayList<>());
        }

        // Check if the user is already assigned
        if (project.getTeamIds().contains(userId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already assigned to this project");
        }

        // Add the user to the teamIds list
        project.getTeamIds().add(userId);

        // Save the updated project
        projectRepository.save(project);

        return ResponseEntity.ok("User assigned to project successfully");
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProject(@PathVariable String id) {
        // Only Admin can delete projects
        return projectRepository.findById(id).map(project -> {
            projectRepository.delete(project);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}

