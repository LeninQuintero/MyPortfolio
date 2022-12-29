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
    public List<UserProfile> userList() {
        return userRepo.findAll();
    }

    @Override
    public void userCreate(UserProfile user) {
         userRepo.save(user);
    }

    @Override
    public void userDelete(Long id) {
        userRepo.deleteById(id);
    }

    @Override
    public UserProfile userFind(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public UserProfile userEdit(UserProfile user) {
        return userRepo.save(user);
    }
}