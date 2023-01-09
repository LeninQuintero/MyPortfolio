package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.Project;
import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUserProfile(UserProfile user);
}
