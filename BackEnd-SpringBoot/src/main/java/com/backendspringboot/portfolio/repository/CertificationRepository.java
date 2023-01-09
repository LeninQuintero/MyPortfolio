package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.Certification;
import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {

    List<Certification> findByUserProfile(UserProfile user);
}
