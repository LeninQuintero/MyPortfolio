package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.Experience;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.UserProfileRepository;
import com.backendspringboot.portfolio.service.ExperienceService;
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
public class ExperienceController {

    @Autowired
    private ExperienceService ExpServ;
    
    @Autowired
    private UserProfileRepository UserProfileRepo;

//    @PostMapping("/new-experience")
//    public void experienceCreate(@RequestBody Experience experience) {
//        ExpServ.experienceCreate(experience);
//    }
    
    
    
    
    @PostMapping("/{id}/new-experience")
    public void experienceCreate(@PathVariable Long id, @RequestBody Experience experience) {
    UserProfile userProfile = UserProfileRepo.findById(id).orElse(null);
    if (userProfile != null) {
      experience.setUserProfile(userProfile);
      ExpServ.experienceCreate(experience);
    } 
    }
    
//    @PostMapping("/new-experience/{idUser}")
//    public void experienceCreate(@RequestBody Experience experience, @PathVariable Long idUser) {
//        
//        
//        
//        
//        ExpServ.experienceCreate(experience);
//    }

    @GetMapping("/experience-list")
    @ResponseBody
    public List<Experience> experienceList() {
        return ExpServ.experienceList();
    }

    @DeleteMapping("/delete-experience/{id}")
    public void experienceDelete(@PathVariable Long id) {
        ExpServ.experienceDelete(id);
    }

    @PutMapping("/edit-experience")
    @ResponseBody
    public Experience experienceEdit(@RequestBody Experience experience) {
        ExpServ.experienceEdit(experience);
        return ExpServ.experienceFind(experience.getId());
    }

    @GetMapping("/find-experience/{id}")
    @ResponseBody
    public Experience experienceFind(@PathVariable Long id) {
        return ExpServ.experienceFind(id);
    }

}
