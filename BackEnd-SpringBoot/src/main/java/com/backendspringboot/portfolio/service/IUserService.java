package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.User;
import java.util.List;

public interface IUserService {
    
    public List<User> userList();
    
    public void userCreate (User user);
    
    public void userDelete (Long id);
    
    public User userFind (Long id);
    
    public User userEdit (User user);
    
}
