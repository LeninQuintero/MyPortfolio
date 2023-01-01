package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    
    @Autowired
    public UserRepository userRepo;

    @Override
    public List<UserProfile> profileList() {
        return userRepo.findAll();
    }

    @Override
    public void profileCreate(UserProfile user) {
         userRepo.save(user);
    }

    @Override
    public void profileDelete(Long id) {
        userRepo.deleteById(id);
    }

    @Override
    public UserProfile profileFind(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public UserProfile profileEdit(UserProfile user) {
        return userRepo.save(user);
    }
}