package com.javachat.server.repository;

import com.javachat.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository; // provides CRUD operations and more for the User entity

public interface UserRepository extends JpaRepository<User, Long> {
}   