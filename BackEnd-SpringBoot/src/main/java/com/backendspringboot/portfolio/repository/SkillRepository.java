package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.Skill;
import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByUserProfile(UserProfile user);
}
