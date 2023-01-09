package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.model.Experience;
import java.util.List;

public interface IExperienceService {
    
    public List<Experience> experienceList();
    
    public List<Experience> userExperienceList(Long id);
    
    public void experienceCreate (Experience experience);
    
    public void experienceDelete (Long id);
    
    public Experience experienceFind (Long id);
    
    public Experience experienceEdit (Experience experience);
    
}
