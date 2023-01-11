package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.UserCredentialsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.backendspringboot.portfolio.service.UserProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin("*")
@RestController
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileServ;

    @Autowired
    private UserCredentialsService userCredentialsServ;

    @GetMapping("/profile-list")
    @ResponseBody
    public List<UserProfile> profileList() {
        return userProfileServ.profileList();
    }

    @GetMapping("/find-profile/{id}")
    @ResponseBody
    public UserProfile profileFind(@PathVariable Long id) {
        return userProfileServ.profileFind(id);
    }

    @PutMapping("/edit-profile")
    @ResponseBody
    public UserProfile profileEdit(@RequestBody UserProfile profile) {

        UserCredentials userCred = userCredentialsServ.userCredentialFindId(profile.getId());

        profile.setUserCredentials(userCred);

        userProfileServ.profileEdit(profile);

        return userProfileServ.profileFind(profile.getId());
    }

    @GetMapping("/find-{username}")
    @ResponseBody
    public UserProfile userFind(@PathVariable String username) {

        UserCredentials user = userCredentialsServ.findByUsername(username);

        return userProfileServ.profileFind(user.getId());
    }

    @GetMapping("/exist-{username}")
    @ResponseBody
    public ResponseEntity<Boolean> userExist(@PathVariable String username) {
        
        try {
            UserCredentials user = userCredentialsServ.findByUsername(username);
            user.getId();
            return ResponseEntity.status(HttpStatus.OK).body(true);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
}