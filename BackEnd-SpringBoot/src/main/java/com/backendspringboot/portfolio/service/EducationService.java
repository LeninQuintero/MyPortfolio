package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Education;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.EducationRepository;
import com.backendspringboot.portfolio.repository.UserProfileRepository;
import com.backendspringboot.portfolio.service.interfaces.IEducationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EducationService implements IEducationService {

    @Autowired
    public UserProfileRepository userProfileRepo;

    @Autowired
    public EducationRepository educationRepo;

    @Override
    public List<Education> educationList() {
        return educationRepo.findAll();
    }

    @Override
    public List<Education> userEducationList(Long id) {
        UserProfile user = userProfileRepo.findById(id).orElse(null);
        return educationRepo.findByUserProfile(user);
    }

    @Override
    public void educationCreate(Education education) {
        educationRepo.save(education);
    }

    @Override
    public void educationDelete(Long id) {
        educationRepo.deleteById(id);
    }

    @Override
    public Education educationFind(Long id) {
        return educationRepo.findById(id).orElse(null);
    }

    @Override
    public Education educationEdit(Education education) {
        Education educDB = educationRepo.findById(education.getId()).orElse(null);
        education.setUserProfile(educDB.getUserProfile());
        educationRepo.save(education);
        return educationRepo.findById(education.getId()).orElse(null);
    }

}
