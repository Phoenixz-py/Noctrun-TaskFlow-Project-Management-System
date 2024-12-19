//package com.nocturn.noctrun_taskflow.models;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//@Document(collection = "users") // MongoDB collection name
//public class User {
//    @Id
//    private String id; // Unique User ID
//
//    private String name;     // User's name
//    private String email;    // User's email
//    private String role;     // User's role (e.g., Admin, Manager, Developer)
//    private String username; // User's username (new field)
//
//    // Getters
//    public String getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    // Setters
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//}

package com.nocturn.noctrun_taskflow.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id; // Unique User ID

    private String name;      // User's name
    private String email;     // User's email
    private String username;  // User's username
    private String password;  // User's password (hashed)

    private Role role;       // User's role (User, Team Lead, Admin)

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
