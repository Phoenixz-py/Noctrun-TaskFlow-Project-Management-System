package models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "projects") // MongoDB collection name
@Data // Lombok for boilerplate code
public class Project {
    @Id
    private String id; // Unique Project ID

    private String name;           // Project title
    private String description;    // Project description
    private Date startDate;        // Start date
    private Date endDate;          // End date
    private String createdBy;      // ID of Admin/Manager who created this project
    private List<String> teamIds;  // List of User IDs involved in this project
}
