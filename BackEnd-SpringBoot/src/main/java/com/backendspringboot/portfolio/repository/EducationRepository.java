package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.Education;
import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {

    List<Education> findByUserProfile(UserProfile user);
}
