package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.Role;
import com.backendspringboot.portfolio.service.RoleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class RoleController {

    @Autowired
    private RoleService roleServ;

    @PostMapping("/new-role")
    public void roleCreate(@RequestBody Role role) {
        roleServ.roleCreate(role);
    }

    @GetMapping("/role-list")
    @ResponseBody
    public List<Role> roleList() {
        return roleServ.roleList();
    }

    @GetMapping("/find-role/{id}")
    @ResponseBody
    public Role roleFind(@PathVariable Long id) {
        return roleServ.roleFind(id);
    }

    @GetMapping("/find-rolename")
    @ResponseBody
    public Role roleNameFind(@RequestParam String rolename) {
        return roleServ.findByName(rolename);
    }

    @DeleteMapping("/delete-role/{id}")
    public void roleDelete(@PathVariable Long id) {       
        roleServ.roleDelete(id);
    }
}
