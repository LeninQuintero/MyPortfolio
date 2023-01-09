package com.backendspringboot.portfolio.repository;

import com.backendspringboot.portfolio.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository <Role, Long> {
    Role findByRoleName(String rolename);
}
