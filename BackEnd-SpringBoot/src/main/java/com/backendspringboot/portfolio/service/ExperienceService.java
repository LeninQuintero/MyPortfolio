package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.service.interfaces.IExperienceService;
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
    public ExperienceRepository experienceRepo;

    @Override
    public List<Experience> experienceList() {
        return experienceRepo.findAll();
    }

    @Override
    public List<Experience> userExperienceList(Long id) {
        UserProfile user = userProfileRepo.findById(id).orElse(null);
        return experienceRepo.findByUserProfile(user);
    }

    @Override
    public void experienceCreate(Experience experience) {
        experienceRepo.save(experience);
    }

    @Override
    public void experienceDelete(Long id) {
        experienceRepo.deleteById(id);
    }

    @Override
    public Experience experienceFind(Long id) {
        return experienceRepo.findById(id).orElse(null);
    }

    @Override
    public Experience experienceEdit(Experience experience) {

        Experience expeDB = experienceRepo.findById(experience.getId()).orElse(null);
        experience.setUserProfile(expeDB.getUserProfile());
        experienceRepo.save(experience);
        return experienceRepo.findById(experience.getId()).orElse(null);
    }
}
