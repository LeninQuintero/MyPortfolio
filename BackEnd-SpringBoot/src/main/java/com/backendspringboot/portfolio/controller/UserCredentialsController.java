package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.FileService;
import com.backendspringboot.portfolio.service.UserCredentialsService;
import com.backendspringboot.portfolio.service.UserProfileService;
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

@CrossOrigin("*")
@RestController
public class UserCredentialsController {
    
    @Autowired
    private FileService fileService;

    @Autowired
    private UserCredentialsService userCredentialsServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-user")
    @ResponseBody
    public UserProfile userCreate(@RequestBody UserCredentials user) {
     userCredentialsServ.userCredentialCreate(user);

        UserProfile userProfile = new UserProfile(
                user.getId(),
                "Nuevo Usuario",
                "Titulo del Portafolio",
                "http://localhost:8080/uploads/defaultimages/foto-perfil.webp",
                "http://localhost:8080/uploads/defaultimages/banner-mobile.webp",
                "http://localhost:8080/uploads/defaultimages/banner-desktop.webp",
                "Descripción del perfil del usuario",
                "https://github.com/#",
                "https://twitter.com/#",
                "https://www.linkedin.com/#",
                "http://localhost:8080/" + user.getUserName()
        );
                
        
        userProfileServ.profileCreate(userProfile);
        
        
        fileService.initStorage(user.getUserName());
        
        
        return userProfileServ.profileFind(userProfile.getId());
    }

    @GetMapping("/user-list")
    @ResponseBody
    public List<UserCredentials> userList() {
        return userCredentialsServ.userCredentialList();
    }

    @DeleteMapping("/delete-user/{id}")
    public void userDelete(@PathVariable Long id) {
        UserCredentials user = userCredentialsServ.userCredentialFindId(id);  
        userCredentialsServ.userCredentialDelete(id);  
        fileService.deleteStorage(user.getUserName());        
    }

    @PutMapping("/edit-user")
    @ResponseBody
    public UserCredentials userEdit(@RequestBody UserCredentials user) {
        userCredentialsServ.userCredentialEdit(user);
        return userCredentialsServ.userCredentialFindId(user.getId());
    }

    @GetMapping("/find-user/{id}")
    @ResponseBody
    public UserCredentials userFind(@PathVariable Long id) {
        return userCredentialsServ.userCredentialFindId(id);
    }
}
