package com.javachat.server.controller;

import com.javachat.server.model.User; //for representing the User entity in the application
import com.javachat.server.service.UserService; //for handling business logic related to User operations
import org.springframework.web.bind.annotation.PostMapping; // for mapping HTTP POST requests to handler methods
import org.springframework.web.bind.annotation.RequestBody;// for binding the HTTP request body to a method parameter
import org.springframework.web.bind.annotation.RestController;//for handling HTTP requests and returning responses

@RestController //for handling HTTP requests and returning responses
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users") // for mapping HTTP POST requests to handler methods
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}