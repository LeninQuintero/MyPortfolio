package com.backendspringboot.portfolio.controller;

import static com.backendspringboot.portfolio.commons.Constants.FRONTEND_URL;
import com.backendspringboot.portfolio.model.Skill;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.SkillService;
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
public class SkillController {

    @Autowired
    private SkillService skillServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-skill/{id}")
    public Skill skillCreate(@PathVariable Long id, @RequestBody Skill skill) {
        UserProfile userProfile = userProfileServ.profileFind(id);

        if (userProfile != null) {
            skill.setUserProfile(userProfile);
            skillServ.skillCreate(skill);
        }
        return skillServ.skillFind(skill.getId());
    }

    @GetMapping("/skill-list/{id}")
    @ResponseBody
    public List<Skill> skillList(@PathVariable Long id) {
        return skillServ.userSkillList(id);
    }

    @DeleteMapping("/delete-skill/{id}")
    public void skillDelete(@PathVariable Long id) {
        Skill skill = skillServ.skillFind(id);

        if (skill.getUserProfile() != null) {

            skill.setUserProfile(null);
        }
        skillServ.skillDelete(id);
    }

    @PutMapping("/edit-skill")
    @ResponseBody
    public Skill skillEdit(@RequestBody Skill skill) {
        return skillServ.skillEdit(skill);
    }

    @GetMapping("/find-skill/{id}")
    @ResponseBody
    public Skill skillFind(@PathVariable Long id) {
        return skillServ.skillFind(id);
    }
}
