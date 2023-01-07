package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backendspringboot.portfolio.repository.UserProfileRepository;

@Service
public class UserProfileService implements IUserProfileService {

    @Autowired
    public UserProfileRepository userRepo;

    @Override
    public List<UserProfile> profileList() {
        return userRepo.findAll();
    }

    @Override
    public void profileCreate(UserProfile profile) {
        userRepo.save(profile);
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
    public UserProfile profileEdit(UserProfile profile) {
        return userRepo.save(profile);
    }
}
