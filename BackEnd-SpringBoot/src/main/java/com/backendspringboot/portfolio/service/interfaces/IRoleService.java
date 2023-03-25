package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.security.enums.entity.Role;
import java.util.List;

public interface IRoleService {
    
    public List<Role> roleList();
    
    public void roleCreate (Role role);
    
    public void roleDelete (Long id);
    
    public Role roleFind (Long id);
    
    public Role roleEdit (Role role);
    
    public Role findByName(String rolename);
    
}
