package com.nocturn.noctrun_taskflow.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "tasks") // MongoDB collection name
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

    // Getters
    public String getId() {
        return id;
    }

    public String getProjectId() {
        return projectId;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public int getPriority() {
        return priority;
    }

    public Date getDeadline() {
        return deadline;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }
}
