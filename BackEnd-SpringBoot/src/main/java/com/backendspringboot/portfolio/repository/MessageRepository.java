package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.Message;
import com.backendspringboot.portfolio.model.UserProfile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByUserProfile(UserProfile user);
}
