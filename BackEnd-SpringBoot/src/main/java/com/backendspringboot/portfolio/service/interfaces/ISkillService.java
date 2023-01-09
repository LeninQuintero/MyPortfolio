package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.model.Skill;
import java.util.List;


public interface ISkillService {
    
    public List<Skill> skillList();
    
    public List<Skill> userSkillList(Long id);
    
    public void skillCreate (Skill skill);
    
    public void skillDelete (Long id);
    
    public Skill skillFind (Long id);
    
    public Skill skillEdit (Skill skill);
    
}
