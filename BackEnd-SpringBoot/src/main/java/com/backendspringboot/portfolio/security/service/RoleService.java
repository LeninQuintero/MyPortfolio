
package com.backendspringboot.portfolio.security.service;

import com.backendspringboot.portfolio.security.enums.RoleName;
import com.backendspringboot.portfolio.security.enums.entity.Role;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backendspringboot.portfolio.security.repository.IRoleRepository;

@Service
@Transactional
public class RoleService {
    @Autowired
    IRoleRepository irolRepository;
    
    public Optional<Role> getbyRoleName(RoleName roleName){
        return irolRepository.findByRoleName(roleName);
    }
    
    public void save(Role role){
        irolRepository.save(role);
    }
}