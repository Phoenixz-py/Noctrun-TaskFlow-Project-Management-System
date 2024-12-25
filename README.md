Underwork
---

# TaskFlow Pro - Project Management System

## Overview
TaskFlow Pro is a modern project management system designed to help teams collaborate, manage tasks, and track project progress in real-time. Built with React, Spring Boot, and MongoDB, it features robust role-based access, real-time updates with WebSockets, and a clean, intuitive UI.

Whether you're managing a small project or overseeing a large team, TaskFlow Pro streamlines your workflow with powerful tools for task assignments, tracking, and collaboration.

## Key Features
- **User Roles**: Admins, Team Leads, and Users with different levels of access and control.
- **Task & Project Management**: Create, assign, and track tasks with detailed descriptions, deadlines, and priorities.
- **Real-Time Updates**: Stay updated on the go with real-time notifications and WebSocket integration.
- **Analytics Dashboard**: Gain insights into project progress and team productivity.
- **JWT Authentication**: Secure login system with role-based access control.
- **Docker Integration**: Easy setup and deployment through Docker.

## Tech Stack
- **Frontend**: React.js + Vite
- **Backend**: Spring Boot
- **Database**: MongoDB
- **Authentication**: JWT
- **WebSocket**: For real-time updates
- **Docker**: For containerization and easy deployment

## Installation

### Prerequisites
- **Java 17+** (for Spring Boot backend)
- **React.js + Vite** (for React frontend)
- **MongoDB** (for database)
- **Docker** (optional, for containerization)

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/taskflow-pro.git
   cd taskflow-pro
   ```

2. **Backend Setup**:
   - Navigate to the backend directory and install dependencies:
     ```bash
     cd backend
     ./mvnw spring-boot:run
     ```
   - The backend will run on `http://localhost:8080`.

3. **Frontend Setup**:
   - Navigate to the frontend directory and install dependencies:
     ```bash
     cd frontendFile
     npm install
     npm run dev
     ```
   - The frontend will be available at `http://localhost:3000`.

4. **Docker (optional)**:
   If you want to use Docker for both the frontend and backend, run the following command:
   ```bash
   docker-compose up --build
   ```

## How to Contribute
1. Fork the repository.
2. Create your branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact
If you have any questions, feel free to reach out to me at sekiro_phoenix (Discord)
