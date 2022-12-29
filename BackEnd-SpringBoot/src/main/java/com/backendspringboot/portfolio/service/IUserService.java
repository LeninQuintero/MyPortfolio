package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;

public interface IUserService {
    
    public List<UserProfile> userList();
    
    public void userCreate (UserProfile user);
    
    public void userDelete (Long id);
    
    public UserProfile userFind (Long id);
    
    public UserProfile userEdit (UserProfile user);

}
