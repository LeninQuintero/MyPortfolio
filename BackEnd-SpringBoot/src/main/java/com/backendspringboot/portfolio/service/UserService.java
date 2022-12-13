package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.User;
import com.backendspringboot.portfolio.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    
    @Autowired
    public UserRepository userRepo;

    @Override
    public List<User> userList() {
        return userRepo.findAll();
    }

    @Override
    public void userCreate(User user) {
         userRepo.save(user);
    }

    @Override
    public void userDelete(Long id) {
        userRepo.deleteById(id);
    }

    @Override
    public User userFind(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public User userEdit(User user) {
        return userRepo.save(user);
    }
}