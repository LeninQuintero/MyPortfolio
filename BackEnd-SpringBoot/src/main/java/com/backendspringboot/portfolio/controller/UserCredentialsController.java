package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.service.IUserCredentialsService;
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

@CrossOrigin ("*")
@RestController
public class UserCredentialsController {
    
    @Autowired
    private IUserCredentialsService userCredentialsServ;
     
    @PostMapping("/new-user")
    public void userCreate(@RequestBody UserCredentials user) {
        
     userCredentialsServ.userCredentialCreate(user);
       
    } 

    @GetMapping("/user-list")
    @ResponseBody
    public List<UserCredentials> userList() {
        return userCredentialsServ.userCredentialList();
    }

    @DeleteMapping ("/delete-user/{id}")
    public void userDelete(@PathVariable Long id){
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
