package com.javachat.server.model;

import jakarta.persistence.Entity; //for marking the class as a JPA entity
import jakarta.persistence.GeneratedValue; //for specifying that the value of the primary key should be generated automatically
import jakarta.persistence.Table; //for specifying the name of the database table that this entity maps to
import jakarta.persistence.Id; //for marking the primary key of the entity

@Entity
@Table(name = "users")//for specifying the name of the database table that this entity maps to , just users is incorrect, it should be @Table(name = "users") to specify the table name
public class User {

    @Id //for marking the primary key of the entity
    @GeneratedValue //for automatically generating the value of the primary key
    private Long id;

    private String username;
    private String password;

    public User() {//default constructor for JPA
    }

    public User(String username, String password) {//parameterized constructor for creating a new user
        this.username = username;
        this.password = password;
    }

    public Long getId() {//getter for id
        return id;
    }
    public String getUsername() {//getter for username
        return username;
    }
    public String getPassword() {//getter for password
        return password;
    }
     
    //for id no setter is provided as it is auto-generated and should not be modified directly
    public void setUsername(String username) {//setter for username , for updating the username of the user
        this.username = username;
    }
    public void setPassword(String password) {//setter for password , for updating the password of the user
        this.password = password;
    }

}