package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Skill;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.SkillRepository;
import com.backendspringboot.portfolio.repository.UserProfileRepository;
import com.backendspringboot.portfolio.service.interfaces.ISkillService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillService implements ISkillService {

    @Autowired
    public UserProfileRepository userProfileRepo;

    @Autowired
    public SkillRepository skillRepo;

    @Override
    public List<Skill> skillList() {
        return skillRepo.findAll();
    }

    @Override
    public List<Skill> userSkillList(Long id) {
        UserProfile user = userProfileRepo.findById(id).orElse(null);
        return skillRepo.findByUserProfile(user);
    }

    @Override
    public void skillCreate(Skill skill) {
        skillRepo.save(skill);
    }

    @Override
    public void skillDelete(Long id) {
        skillRepo.deleteById(id);
    }

    @Override
    public Skill skillFind(Long id) {
        return skillRepo.findById(id).orElse(null);
    }

    @Override
    public Skill skillEdit(Skill skill) {
        Skill skillDB = skillRepo.findById(skill.getId()).orElse(null);
        skill.setUserProfile(skillDB.getUserProfile());
        skillRepo.save(skill);
        return skillRepo.findById(skill.getId()).orElse(null);
    }

}
