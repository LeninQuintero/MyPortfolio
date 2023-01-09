package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Project;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.ProjectRepository;
import com.backendspringboot.portfolio.repository.UserProfileRepository;
import com.backendspringboot.portfolio.service.interfaces.IProjectService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService implements IProjectService {

    @Autowired
    public UserProfileRepository userProfileRepo;

    @Autowired
    public ProjectRepository projectRepo;

    @Override
    public List<Project> projectList() {
        return projectRepo.findAll();
    }

    @Override
    public List<Project> userProjectList(Long id) {
        UserProfile user = userProfileRepo.findById(id).orElse(null);
        return projectRepo.findByUserProfile(user);
    }

    @Override
    public void projectCreate(Project project) {
        projectRepo.save(project);
    }

    @Override
    public void projectDelete(Long id) {
        projectRepo.deleteById(id);
    }

    @Override
    public Project projectFind(Long id) {
        return projectRepo.findById(id).orElse(null);
    }

    @Override
    public Project projectEdit(Project project) {
        Project projectDB = projectRepo.findById(project.getId()).orElse(null);
        project.setUserProfile(projectDB.getUserProfile());
        projectRepo.save(project);
        return projectRepo.findById(project.getId()).orElse(null);
    }

}
