package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.Education;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.EducationService;
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

@CrossOrigin("*")
@RestController
public class EducationController {

    @Autowired
    private EducationService educationServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-education/{id}")
    public Education educationCreate(@PathVariable Long id, @RequestBody Education education) {
        UserProfile userProfile = userProfileServ.profileFind(id);

        if (userProfile != null) {
            education.setUserProfile(userProfile);
            educationServ.educationCreate(education);
        }
        return educationServ.educationFind(education.getId());
    }

    @GetMapping("/education-list/{id}")
    @ResponseBody
    public List<Education> educationList(@PathVariable Long id) {
        return educationServ.userEducationList(id);
    }

    @DeleteMapping("/delete-education/{id}")
    public void educationDelete(@PathVariable Long id) {
        Education education = educationServ.educationFind(id);

        if (education.getUserProfile() != null) {

            education.setUserProfile(null);
        }
        educationServ.educationDelete(id);
    }

    @PutMapping("/edit-education")
    @ResponseBody
    public Education educationEdit(@RequestBody Education education) {
        return educationServ.educationEdit(education);
    }

    @GetMapping("/find-education/{id}")
    @ResponseBody
    public Education educationFind(@PathVariable Long id) {
        return educationServ.educationFind(id);
    }
}
