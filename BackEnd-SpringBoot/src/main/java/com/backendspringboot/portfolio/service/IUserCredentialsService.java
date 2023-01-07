package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.UserCredentials;
import java.util.List;

public interface IUserCredentialsService {
    
    public List<UserCredentials> userCredentialList();
    
    public void userCredentialCreate (UserCredentials user);
    
    public void userCredentialDelete (Long id);
    
    public UserCredentials userCredentialFindId (Long id);
    
    public UserCredentials userCredentialEdit (UserCredentials user);
    
    public UserCredentials findByUsername(String username);
    
}
