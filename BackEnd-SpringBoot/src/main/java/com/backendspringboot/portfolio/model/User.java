package com.backendspringboot.portfolio.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    private String userName;
    private String password;
    private String name;
    private String title;
    private String urlProfilePic;
    private String urlBannerSm;
    private String urlBannerLg;
    private String aboutMe;

    public User() {
    }

    public User(long id, String userName, String password, String name, String title, String urlProfilePic, String urlBannerSm, String urlBannerLg, String aboutMe) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.title = title;
        this.urlProfilePic = urlProfilePic;
        this.urlBannerSm = urlBannerSm;
        this.urlBannerLg = urlBannerLg;
        this.aboutMe = aboutMe;
    } 
}
