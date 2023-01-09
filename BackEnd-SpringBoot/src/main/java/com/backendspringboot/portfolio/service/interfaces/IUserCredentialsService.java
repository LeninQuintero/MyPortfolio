package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;

public interface IUserCredentialsService {
    
    public List<UserCredentials> userCredentialList();
    
    public UserProfile userCredentialCreate (UserCredentials user);
    
    public void userCredentialDelete (Long id);
    
    public UserCredentials userCredentialFindId (Long id);
    
    public UserCredentials userCredentialEdit (UserCredentials user);
    
    public UserCredentials findByUsername(String username);
    
}
