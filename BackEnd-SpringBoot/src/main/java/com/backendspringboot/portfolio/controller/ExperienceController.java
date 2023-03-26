package com.backendspringboot.portfolio.controller;

import static com.backendspringboot.portfolio.commons.Constants.FRONTEND_URL;
import com.backendspringboot.portfolio.model.Experience;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.ExperienceService;
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
public class ExperienceController {

    @Autowired
    private ExperienceService experienceServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-experience/{id}")
    public Experience experienceCreate(@PathVariable Long id, @RequestBody Experience experience) {
        UserProfile userProfile = userProfileServ.profileFind(id);

        if (userProfile != null) {
            experience.setUserProfile(userProfile);
            experienceServ.experienceCreate(experience);
        }
        return experience;
    }

    @GetMapping("/experience-list/{id}")
    @ResponseBody
    public List<Experience> experienceList(@PathVariable Long id) {
        return experienceServ.userExperienceList(id);
    }

    @DeleteMapping("/delete-experience/{id}")
    public void experienceDelete(@PathVariable Long id) {
        Experience experience = experienceServ.experienceFind(id);

        if (experience.getUserProfile() != null) {

            experience.setUserProfile(null);

        }
        experienceServ.experienceDelete(id);
    }

    @PutMapping("/edit-experience")
    @ResponseBody
    public Experience experienceEdit(@RequestBody Experience experience) {
        return experienceServ.experienceEdit(experience);
    }

    @GetMapping("/find-experience/{id}")
    @ResponseBody
    public Experience experienceFind(@PathVariable Long id) {
        return experienceServ.experienceFind(id);
    }
}
