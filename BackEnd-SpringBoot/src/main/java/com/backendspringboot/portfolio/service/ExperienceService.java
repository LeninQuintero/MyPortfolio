package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Experience;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.ExperienceRepository;
import com.backendspringboot.portfolio.repository.UserProfileRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExperienceService implements IExperienceService {
    
    @Autowired
    public UserProfileRepository userProfileRepo;

    @Autowired
    public ExperienceRepository expRepo;

    @Override
    public List<Experience> experienceList() {
        return expRepo.findAll();
    }

    @Override
    public void experienceCreate(Experience experience) {
        expRepo.save(experience);
    }

    @Override
    public void experienceDelete(Long id) {
        expRepo.deleteById(id);
    }

    @Override
    public Experience experienceFind(Long id) {
        return expRepo.findById(id).orElse(null);
    }

    @Override
    public Experience experienceEdit(Experience experience) {
        
        Experience expeDB = expRepo.findById(experience.getId()).orElse(null);
        experience.setUserProfile(expeDB.getUserProfile());
        expRepo.save(experience);
        return expRepo.findById(experience.getId()).orElse(null);     
    }
    
    @Override
    public List<Experience> userExperienceList(Long id) {
        UserProfile user = userProfileRepo.findById(id).orElse(null);
        return expRepo.findByUserProfile(user);
    }
}
