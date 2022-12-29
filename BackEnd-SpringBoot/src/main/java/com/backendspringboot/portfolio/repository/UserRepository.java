package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <UserProfile, Long> {  
}
