package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.repository.UserCredentialsRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialsService implements IUserCredentialsService {
    
    @Autowired
    public UserCredentialsRepository userCredRepo;

    @Override
    public List<UserCredentials> userCredentialList() {
     return userCredRepo.findAll();
    }

    @Override
    public void userCredentialCreate(UserCredentials user) {
        userCredRepo.save(user);
    }

    @Override
    public void userCredentialDelete(Long id) {
        userCredRepo.deleteById(id);
    }

    @Override
    public UserCredentials userCredentialFindId(Long id) {
        return userCredRepo.findById(id).orElse(null);
    }

    @Override
    public UserCredentials userCredentialEdit(UserCredentials user) {
        return userCredRepo.save(user);
    }
       
}