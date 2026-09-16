package com.javachat.server.service;

import com.javachat.server.model.User; //for representing the User entity in the application
import com.javachat.server.repository.UserRepository; //for accessing the User entity in the database
import org.springframework.stereotype.Service; //for marking the class as a service component in the Spring context

@Service //for marking the class as a service component in the Spring context
public class UserService {

    private final UserRepository userRepository;//for accessing the User entity in the database
    //final keyword is used to indicate that the reference to the UserRepository cannot be changed after it is initialized
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) { //for saving a new user to the database
        return userRepository.save(user);
    }
}