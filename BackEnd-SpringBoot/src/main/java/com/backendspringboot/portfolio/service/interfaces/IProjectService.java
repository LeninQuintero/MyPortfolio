package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.model.Project;
import java.util.List;

public interface IProjectService {
    
    public List<Project> projectList();
    
    public List<Project> userProjectList(Long id);
    
    public void projectCreate (Project project);
    
    public void projectDelete (Long id);
    
    public Project projectFind (Long id);
    
    public Project projectEdit (Project skill);
    
}
