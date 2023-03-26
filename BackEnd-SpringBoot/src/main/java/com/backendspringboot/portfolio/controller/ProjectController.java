package com.backendspringboot.portfolio.controller;

import static com.backendspringboot.portfolio.commons.Constants.FRONTEND_URL;
import com.backendspringboot.portfolio.model.Project;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.ProjectService;
import com.backendspringboot.portfolio.service.UserProfileService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(FRONTEND_URL)
@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-project/{id}")
    public Project projectCreate(@PathVariable Long id, @RequestBody Project project) {
        UserProfile userProfile = userProfileServ.profileFind(id);

        if (userProfile != null) {
            project.setUserProfile(userProfile);
            projectServ.projectCreate(project);
        }
        return projectServ.projectFind(project.getId());
    }

    @GetMapping("/project-list/{id}")
    @ResponseBody
    public List<Project> projectList(@PathVariable Long id) {
        return projectServ.userProjectList(id);
    }

    @DeleteMapping("/delete-project/{id}")
    public void projectDelete(@PathVariable Long id) {
        Project project = projectServ.projectFind(id);

        if (project.getUserProfile() != null) {

            project.setUserProfile(null);
        }
        projectServ.projectDelete(id);
    }

    @PutMapping("/edit-project")
    @ResponseBody
    public Project projectEdit(@RequestBody Project project) {
        return projectServ.projectEdit(project);
    }

    @GetMapping("/find-project/{id}")
    @ResponseBody
    public Project projectFind(@PathVariable Long id) {
        return projectServ.projectFind(id);
    }
}
