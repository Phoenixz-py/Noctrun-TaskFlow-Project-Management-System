package com.nocturn.noctrun_taskflow.repositories;

import com.nocturn.noctrun_taskflow.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // MongoRepository already provides basic CRUD operations

    // Custom method to find user by username
    Optional<User> findByUsername(String username);

    // Custom method to find user by email
    Optional<User> findByEmail(String email);

    // You can add more custom query methods if needed
}

