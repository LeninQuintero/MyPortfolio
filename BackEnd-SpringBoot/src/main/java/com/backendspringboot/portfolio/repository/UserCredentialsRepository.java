package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialsRepository  extends JpaRepository <UserCredentials, Long> {   
   UserCredentials findByUserName(String username);
}
