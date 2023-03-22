
package com.backendspringboot.portfolio.security.repository;

import com.backendspringboot.portfolio.security.enums.RolNombre;
import com.backendspringboot.portfolio.security.enums.entity.Rol;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface iRolRepository extends JpaRepository<Rol, Integer>{
    Optional<Rol> findByRolNombre(RolNombre rolNombre);
}