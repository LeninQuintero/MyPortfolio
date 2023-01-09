package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.model.Education;
import java.util.List;


public interface IEducationService {
    
    public List<Education> educationList();
    
    public List<Education> userEducationList(Long id);
    
    public void educationCreate (Education education);
    
    public void educationDelete (Long id);
    
    public Education educationFind (Long id);
    
    public Education educationEdit (Education education);
    
}
