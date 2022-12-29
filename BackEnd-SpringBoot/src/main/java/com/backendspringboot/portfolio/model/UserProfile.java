package com.backendspringboot.portfolio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "user_profile")
public class UserProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_user", nullable = false, unique = true)
    private Long id;  
    
    @Column(name= "name",  nullable = false, length = 40)
    private String name;
    
    @Column(name= "title",  nullable = false, length = 40)
    private String title;
    
    @Column(name= "url_profile_pic",  nullable = false, length = 255)
    private String urlProfilePic;
    
    @Column(name= "url_banner_sm",  nullable = false, length = 255)
    private String urlBannerSm;
    
    @Column(name= "url_banner_lg",  nullable = false, length = 255)
    private String urlBannerLg;
    
    @Column(name= "about_me",  nullable = false, length = 800)
    private String aboutMe;
    
    @Column(name= "url_github",  nullable = false, length = 255)
    private String urlGithub;
    
    @Column(name= "url_twitter",  nullable = false, length = 255)
    private String urlTwitter;
    
    @Column(name= "url_linkedin",  nullable = false, length = 255)
    private String urlLinkedin;

    public UserProfile() {
    }

    public UserProfile(Long id, String urlGithub, String urlTwitter, String urlLinkedin,
            String name, String title, String urlProfilePic, String urlBannerSm, 
            String urlBannerLg, String aboutMe) {
        
        this.id = id;
        this.urlGithub = urlGithub;
        this.urlTwitter = urlTwitter;
        this.urlLinkedin = urlLinkedin;
        this.name = name;
        this.title = title;
        this.urlProfilePic = urlProfilePic;
        this.urlBannerSm = urlBannerSm;
        this.urlBannerLg = urlBannerLg;
        this.aboutMe = aboutMe;
    }

}