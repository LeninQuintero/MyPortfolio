package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.model.UserProfile;
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
    private UserCredentialsService userCredentialsServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-user")
    @ResponseBody
    public UserProfile userCreate(@RequestBody UserCredentials user) {
     userCredentialsServ.userCredentialCreate(user);

        UserProfile userProfile = new UserProfile(
                user.getId(),
                "Lenin Quintero",
                "Full Stack Developer Jr.",
                "http://localhost:8080/uploads/foto-perfil.webp",
                "http://localhost:8080/uploads/banner-mobile.webp",
                "http://localhost:8080/uploads/banner-desktop.webp",
                "Desde muy pequeño he tenido especial interés en saber el funcionamiento de las \"cosas\" lo cual me ha "
                        + "resultado muy útil a la hora de enfrentar desafíos personales y laborales a lo largo de mi vida. "
                        + "Descubrí la programación hace muy poco y me he vuelto a sentir como aquel niño con hambre de conocimiento. "
                        + "Hoy en día me estoy preparando para poder insertarme en el mercado laboral IT enfocado a Data Science y/o Business Intelligence.",
                "https://github.com/LeninQuintero",
                "https://twitter.com/lenartock",
                "https://www.linkedin.com/in/lenin-quintero-1685b7136",
                "http://localhost:8080/" + user.getUserName()
        );
                
        
        userProfileServ.profileCreate(userProfile);
        
        
        return userProfileServ.profileFind(userProfile.getId());
    }

    @GetMapping("/user-list")
    @ResponseBody
    public List<UserCredentials> userList() {
        return userCredentialsServ.userCredentialList();
    }

    @DeleteMapping("/delete-user/{id}")
    public void userDelete(@PathVariable Long id) {
        userCredentialsServ.userCredentialDelete(id);
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
