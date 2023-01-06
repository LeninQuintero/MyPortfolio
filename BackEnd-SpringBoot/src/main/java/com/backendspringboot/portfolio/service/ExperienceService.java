package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Experience;
import com.backendspringboot.portfolio.repository.ExperienceRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExperienceService implements IExperienceService {
    
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
        return expRepo.save(experience);
    }
    
}
