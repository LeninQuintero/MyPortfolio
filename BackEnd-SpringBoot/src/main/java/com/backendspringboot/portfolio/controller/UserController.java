package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.User;
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

    @PostMapping("/new-user")
    public void userCreate(@RequestBody User user) {
        userServ.userCreate(user);
    } 

    @GetMapping("/user-list")
    @ResponseBody
    public List<User> userList() {
        return userServ.userList();
    }

    @DeleteMapping ("/delete-user/{id}")
    public void userDelete(@PathVariable Long id){
    userServ.userDelete(id);
    }

    @PutMapping("/edit-user")
    @ResponseBody
    public User userEdit(@RequestBody User user) {
        userServ.userEdit(user);
        return userServ.userFind(user.getId());
    }

    @GetMapping("/find-user/{id}")
    @ResponseBody
    public User userFind(@PathVariable Long id) {
        return userServ.userFind(id);
    }
}