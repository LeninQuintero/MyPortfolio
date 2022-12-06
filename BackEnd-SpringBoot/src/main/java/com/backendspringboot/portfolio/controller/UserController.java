package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.User;
import com.backendspringboot.portfolio.service.IUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private IUserService userServ;

    @PostMapping("/new-user")
    public void agregarPersona(@RequestBody User user) {
        userServ.userCreate(user);
    }
    
    @GetMapping("/user-list")
    @ResponseBody
    public List<User> userList() {
        return userServ.userList();
    }
}
