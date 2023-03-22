
package com.backendspringboot.portfolio.security.service;

import com.backendspringboot.portfolio.security.enums.RolNombre;
import com.backendspringboot.portfolio.security.enums.entity.Rol;
import com.backendspringboot.portfolio.security.repository.iRolRepository;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RolService {
    @Autowired
    iRolRepository irolRepository;
    
    public Optional<Rol> getbyRolNombre(RolNombre rolNombre){
        return irolRepository.findByRolNombre(rolNombre);
    }
    
    public void save(Rol rol){
        irolRepository.save(rol);
    }
}