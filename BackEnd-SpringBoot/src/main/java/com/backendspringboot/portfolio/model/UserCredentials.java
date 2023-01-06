package com.backendspringboot.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_credentials")
public class UserCredentials implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id", nullable = false, unique = true)
    private Long id;
    
    @Column(name= "username",  nullable = false, unique = true, length = 40)
    private String userName;
    
    @Column(name= "password",  nullable = false, length = 60)
    private String password;
    
     @OneToOne(cascade=CascadeType.ALL)
     @JoinColumn(name = "id")
     @JsonIgnore
     private UserProfile userProfile;

    public UserCredentials() {
    }

    public UserCredentials(String userName, String password, UserProfile userProfile) {
        this.userName = userName;
        this.password = password;
        this.userProfile = userProfile;
    }






}
