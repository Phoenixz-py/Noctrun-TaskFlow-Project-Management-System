package models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // MongoDB collection name
@Data // Lombok annotation for Getters, Setters, toString, etc.
public class User {
    @Id
    private String id; // Unique User ID

    private String name;     // User's full name
    private String email;    // User's email (unique identifier)
    private String password; // Encrypted password
    private String role;     // ADMIN, PROJECT_MANAGER, TEAM_MEMBER
}

