package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Role;
import com.backendspringboot.portfolio.repository.RoleRepository;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService {

    @Autowired
    public RoleRepository roleRepo;

    @Override
    public List<Role> roleList() {
        return roleRepo.findAll();
    }

    @Override
    public void roleCreate(Role role) {
        roleRepo.save(role);
    }

    @Override
    @Transactional
    public void roleDelete(Long id) {
        Role role = roleRepo.findById(id).orElse(null);

        if (!"ADMINISTRATOR".equals(role.getRoleName()) && !"USER".equals(role.getRoleName())) {
            role.getUserCredentials().forEach(user -> user.getRoles().remove(role));
            roleRepo.deleteById(id);
        }
    }

    @Override
    public Role roleFind(Long id) {
        return roleRepo.findById(id).orElse(null);
    }

    @Override
    public Role roleEdit(Role role) {
        return roleRepo.save(role);
    }

    @Override
    public Role findByName(String rolename) {
        return roleRepo.findByRoleName(rolename);
    }

}
