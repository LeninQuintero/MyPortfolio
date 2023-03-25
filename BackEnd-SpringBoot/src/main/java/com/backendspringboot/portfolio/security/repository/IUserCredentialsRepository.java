
package com.backendspringboot.portfolio.security.repository;

import com.backendspringboot.portfolio.security.enums.entity.UserCredentials;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserCredentialsRepository extends JpaRepository<UserCredentials, Long>{
    
    Optional<UserCredentials> findByUserName(String userName);
    boolean existsByUserName(String userName);
}