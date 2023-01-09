package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Role;
import com.backendspringboot.portfolio.model.UserCredentials;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.UserCredentialsRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialsService implements IUserCredentialsService {
    
    @Autowired
    public UserCredentialsRepository userCredRepo;
    
    @Autowired
    public RoleService roleServ;
    
    @Autowired
    public UserProfileService userProfileServ;
    
    @Autowired
    public FileService fileServ;

    @Override
    public List<UserCredentials> userCredentialList() {
     return userCredRepo.findAll();
    }

    @Override
    public UserProfile userCredentialCreate(UserCredentials user) {
       Role userRole = roleServ.findByName("USER");
       user.getRoles().add(userRole);
         
       userCredRepo.save(user);
       
       if (user.getId() == 1){
           Role adminRole = roleServ.findByName("ADMINISTRATOR");
           user.getRoles().add(adminRole);
       }

        UserProfile userProfile = new UserProfile(
                user.getId(),
                "Nuevo Usuario",
                "Titulo del Portafolio",
                "http://localhost:8080/uploads/defaultimages/foto-perfil.webp",
                "http://localhost:8080/uploads/defaultimages/banner-mobile.webp",
                "http://localhost:8080/uploads/defaultimages/banner-desktop.webp",
                "Descripción del perfil del usuario",
                "https://github.com/#",
                "https://twitter.com/#",
                "https://www.linkedin.com/#",
                "http://localhost:8080/" + user.getUserName(),
                user);

        userProfileServ.profileCreate(userProfile);

        userCredentialFindId(user.getId()).setUserProfile(userProfile);

        fileServ.initStorage(user.getUserName());

        return userProfileServ.profileFind(userProfile.getId());
    }

    @Override
    public void userCredentialDelete(Long id) {    
        UserCredentials user = userCredRepo.findById(id).orElse(null);
        userCredRepo.deleteById(id);
        fileServ.deleteStorage(user.getUserName());          
    }

    @Override
    public UserCredentials userCredentialFindId(Long id) {
        return userCredRepo.findById(id).orElse(null);
    }

    @Override
    public UserCredentials userCredentialEdit(UserCredentials user) {
         userCredRepo.save(user);
        return  userCredRepo.findById(user.getId()).orElse(null);
    }

    @Override
    public UserCredentials findByUsername(String username) {
        return userCredRepo.findByUserName(username);
    }
       
}