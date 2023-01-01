package com.backendspringboot.portfolio.model;

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

@Getter @Setter
@Entity
@Table(name = "user_profile")
public class UserProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_profile", nullable = false, unique = true)
    private Long id;  
    
    @Column(name= "name", length = 40)
    private String name;
    
    @Column(name= "title", length = 40)
    private String title;
    
    @Column(name= "url_profile_pic", length = 255)
    private String urlProfilePic;
    
    @Column(name= "url_banner_sm", length = 255)
    private String urlBannerSm;
    
    @Column(name= "url_banner_lg", length = 255)
    private String urlBannerLg;
    
    @Column(name= "about_me", length = 800)
    private String aboutMe;
    
    @Column(name= "url_github", length = 255)
    private String urlGithub;
    
    @Column(name= "url_twitter", length = 255)
    private String urlTwitter;
    
    @Column(name= "url_linkedin", length = 255)
    private String urlLinkedin;
    
    @OneToOne
    @JoinColumn(name = "id_user")
    private UserCredentials userCredentials;

    public UserProfile() {
    }

    public UserProfile(String name, String title, String urlProfilePic, String urlBannerSm, 
            String urlBannerLg, String aboutMe, String urlGithub, String urlTwitter, 
           String urlLinkedin, UserCredentials userCredentials) {
        
        this.name = name;
        this.title = title;
        this.urlProfilePic = urlProfilePic;
        this.urlBannerSm = urlBannerSm;
        this.urlBannerLg = urlBannerLg;
        this.aboutMe = aboutMe;
        this.urlGithub = urlGithub;
        this.urlTwitter = urlTwitter;
        this.urlLinkedin = urlLinkedin;
        this.userCredentials = userCredentials;
    }

}