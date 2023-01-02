package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;

public interface IUserProfileService {
    
    public List<UserProfile> profileList();
    
    public void profileCreate (UserProfile Profile);
    
    public void profileDelete (Long id);
    
    public UserProfile profileFind (Long id);
    
    public UserProfile profileEdit (UserProfile profile);

}
