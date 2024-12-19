//package com.nocturn.noctrun_taskflow.controllers;
//
//import com.nocturn.noctrun_taskflow.models.Project;
//import com.nocturn.noctrun_taskflow.repositories.ProjectRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/projects")
//public class ProjectController {
//
//    @Autowired
//    private ProjectRepository projectRepository;
//
//    // Get all projects
//    @GetMapping
//    public List<Project> getAllProjects() {
//        return projectRepository.findAll(); // Use findAll() method from JpaRepository
//    }
//
//    // Get a project by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
//        return projectRepository.findById(id) // Use findById() method from JpaRepository
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // Create a new project
//    @PostMapping
//    public Project createProject(@RequestBody Project project) {
//        return projectRepository.save(project); // Use save() method from JpaRepository
//    }
//
//    // Update a project
//    @PutMapping("/{id}")
//    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project updatedProject) {
//        return projectRepository.findById(id).map(existingProject -> {
//            existingProject.setName(updatedProject.getName());
//            existingProject.setDescription(updatedProject.getDescription());
//            existingProject.setStartDate(updatedProject.getStartDate());
//            existingProject.setEndDate(updatedProject.getEndDate());
//            return ResponseEntity.ok(projectRepository.saveAndFlush(existingProject)); // Use saveAndFlush() to update and persist changes
//        }).orElse(ResponseEntity.notFound().build());
//    }
//
//    // Delete a project
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteProject(@PathVariable String id) {
//        return projectRepository.findById(id).map(project -> {
//            projectRepository.delete(project); // Use delete() method from JpaRepository
//            return ResponseEntity.ok().build();
//        }).orElse(ResponseEntity.notFound().build());
//    }
//}
//

package com.nocturn.noctrun_taskflow.controllers;

import com.nocturn.noctrun_taskflow.models.Project;
import com.nocturn.noctrun_taskflow.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // Delete a project
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id) {
        return projectRepository.findById(id).map(project -> {
            projectRepository.delete(project); // Use delete() method from JpaRepository
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}

