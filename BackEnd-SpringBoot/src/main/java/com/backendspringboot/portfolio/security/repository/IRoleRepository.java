
package com.backendspringboot.portfolio.security.repository;

import com.backendspringboot.portfolio.security.enums.RoleName;
import com.backendspringboot.portfolio.security.enums.entity.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer>{
    Optional<Role> findByRoleName(RoleName roleName);
}