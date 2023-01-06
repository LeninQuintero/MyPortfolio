package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.UserCredentialsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.backendspringboot.portfolio.service.UserProfileService;


@CrossOrigin ("*")
@RestController
public class UserProfileController {
    @Autowired
    private UserProfileService userProfileServ;
    
    @Autowired
    private UserCredentialsService userCredentialsServ;

    @PostMapping("/new-profile")
    public void profileCreate(@RequestBody UserProfile profile) {
        userProfileServ.profileCreate(profile);
    } 

    @GetMapping("/profile-list")
    @ResponseBody
    public List<UserProfile> profileList() {
        return userProfileServ.profileList();
    }

    @DeleteMapping ("/delete-profile/{id}")
    public void profileDelete(@PathVariable Long id){
    userProfileServ.profileDelete(id);
    }

    @PutMapping("/edit-profile")
    @ResponseBody
    public UserProfile profileEdit(@RequestBody UserProfile profile) {
        
       UserCredentials userCred = userCredentialsServ.userCredentialFindId(profile.getId());
       
        profile.setUserCredentials(userCred);
                
        userProfileServ.profileEdit(profile);
        
        
        return userProfileServ.profileFind(profile.getId());
    }

    @GetMapping("/find-profile/{id}")
    @ResponseBody
    public UserProfile profileFind(@PathVariable Long id) {
        return userProfileServ.profileFind(id);
    }
}