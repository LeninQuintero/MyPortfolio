
package com.backendspringboot.portfolio.security.service;

import com.backendspringboot.portfolio.security.enums.entity.UserCredentials;
import com.backendspringboot.portfolio.security.enums.entity.UserMain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsImpl implements UserDetailsService{
    @Autowired
    UserCredentialsService userCredentialsServ;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserCredentials user = userCredentialsServ.findByUsername(userName).get();
        return UserMain.build(user);
    }
    
    
}