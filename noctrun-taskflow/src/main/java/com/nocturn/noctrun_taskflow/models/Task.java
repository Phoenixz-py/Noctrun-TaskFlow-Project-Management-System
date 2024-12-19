package models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "tasks") // MongoDB collection name
@Data // Lombok for Getters, Setters, etc.
public class Task {
    @Id
    private String id; // Unique Task ID

    private String projectId;   // Associated Project ID
    private String assignedTo;  // ID of the User assigned this task
    private String title;       // Task title
    private String description; // Task description
    private String status;      // Task status: TO-DO, IN-PROGRESS, DONE
    private int priority;       // 1=High, 2=Medium, 3=Low
    private Date deadline;      // Task deadline
}
