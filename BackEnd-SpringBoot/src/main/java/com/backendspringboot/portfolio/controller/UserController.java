package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.IUserService;
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
public class UserController {
    @Autowired
    private IUserService userServ;

    @PostMapping("/new-profile")
    public void userCreate(@RequestBody UserProfile user) {
        userServ.profileCreate(user);
    } 

    @GetMapping("/profile-list")
    @ResponseBody
    public List<UserProfile> userList() {
        return userServ.profileList();
    }

    @DeleteMapping ("/delete-profile/{id}")
    public void userDelete(@PathVariable Long id){
    userServ.profileDelete(id);
    }

    @PutMapping("/edit-profile")
    @ResponseBody
    public UserProfile userEdit(@RequestBody UserProfile user) {
        userServ.profileEdit(user);
        return userServ.profileFind(user.getId());
    }

    @GetMapping("/find-profile/{id}")
    @ResponseBody
    public UserProfile userFind(@PathVariable Long id) {
        return userServ.profileFind(id);
    }
}