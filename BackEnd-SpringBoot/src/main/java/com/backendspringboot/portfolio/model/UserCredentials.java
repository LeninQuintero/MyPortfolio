package com.backendspringboot.portfolio.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "user_credentials")
public class UserCredentials {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_user", nullable = false, unique = true)
    private Long id;  
    
    @Column(name= "user_name",  nullable = false, unique = true, length = 40)
    private String userName;
    
    @Column(name= "password",  nullable = false, length = 40)
    private String password;
    
    @OneToOne(mappedBy= "userCredentials",cascade=CascadeType.ALL)
    private UserProfile userProfile;

    public UserCredentials() {
    }

    public UserCredentials(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

}
