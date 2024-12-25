//package com.nocturn.noctrun_taskflow.controllers;
//
//
//import com.nocturn.noctrun_taskflow.models.User;
//import com.nocturn.noctrun_taskflow.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    // Get all users
//    @GetMapping
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    // Get a user by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable String id) {
//        return userRepository.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // Create a new user
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userRepository.save(user);
//    }
//
//    // Update a user
//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
//        return userRepository.findById(id).map(user -> {
//            user.setName(updatedUser.getName());
//            user.setEmail(updatedUser.getEmail());
//            user.setRole(updatedUser.getRole());
//            return ResponseEntity.ok(userRepository.save(user));
//        }).orElse(ResponseEntity.notFound().build());
//    }
//
//    // Delete a user
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteUser(@PathVariable String id) {
//        return userRepository.findById(id).map(user -> {
//            userRepository.delete(user);
//            return ResponseEntity.ok().build();
//        }).orElse(ResponseEntity.notFound().build());
//    }
//}

package com.nocturn.noctrun_taskflow.controllers;

import com.nocturn.noctrun_taskflow.models.User;
import com.nocturn.noctrun_taskflow.models.Role;
import com.nocturn.noctrun_taskflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Declare the PasswordEncoder bean here
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new user with hashed password and role handling
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        // Check if the username or email already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Hash the password before saving the user
        user.setPassword(passwordEncoder().encode(user.getPassword()));

        // Set the role if not provided (defaults to USER)
        if (user.getRole() == null) {
            user.setRole(Role.USER);  // Default role
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Update a user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());
            user.setUsername(updatedUser.getUsername());
            return ResponseEntity.ok(userRepository.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete a user
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEAM_LEAD")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // Create a new Team Lead user - only accessible to Admins
    @PostMapping("/create-teamlead")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createTeamLead(@RequestBody User user) {
        // Check if the username or email already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Hash the password before saving the user
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        // Set the role as TEAM_LEAD
        user.setRole(Role.TEAM_LEAD); // Single role
        userRepository.save(user);
        return ResponseEntity.ok("Team Lead user created successfully");
    }

    // Assign Team Lead role to an existing user
    @PutMapping("/{id}/assign-teamlead")
    @PreAuthorize("hasRole('ADMIN')")  // Only accessible to Admin
    public ResponseEntity<String> assignTeamLeadRole(@PathVariable String id) {
        return userRepository.findById(id).map(user -> {
            if (user.getRole() == Role.ADMIN) {
                return ResponseEntity.badRequest().body("Cannot assign TEAM_LEAD to an ADMIN");
            }

            user.setRole(Role.TEAM_LEAD);  // Set the role to TEAM_LEAD
            userRepository.save(user);
            return ResponseEntity.ok("Role updated to TEAM_LEAD successfully");
        }).orElse(ResponseEntity.notFound().build());
    }

    // Create a new Admin user - only accessible to Admins
    @PostMapping("/create-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createAdmin(@RequestBody User user) {
        // Check if the username or email already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Hash the password before saving the user
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        // Set the role as ADMIN
        user.setRole(Role.ADMIN); // Admin role
        userRepository.save(user);
        return ResponseEntity.ok("Admin user created successfully");
    }
}


