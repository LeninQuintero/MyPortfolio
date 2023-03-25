//package com.backendspringboot.portfolio.service;
//
//import com.backendspringboot.portfolio.service.interfaces.IUserCredentialsService;
//import com.backendspringboot.portfolio.security.enums.entity.Role;
//import com.backendspringboot.portfolio.security.enums.entity.UserCredentials;
//import com.backendspringboot.portfolio.model.UserProfile;
//import com.backendspringboot.portfolio.security.repository.iUsuarioRepository;
//import java.util.List;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserCredentialsService implements IUserCredentialsService {
//    
//    @Autowired
//    public iUsuarioRepository userCredRepo;
//    
//    @Autowired
//    public RoleService roleServ;
//    
//    @Autowired
//    public UserProfileService userProfileServ;
//    
////    @Autowired
////    public FileService fileServ;
//
//    @Override
//    public List<UserCredentials> userCredentialList() {
//     return userCredRepo.findAll();
//    }
//
//    @Override
//    public UserProfile userCredentialCreate(UserCredentials user) {
//       Role userRole = roleServ.findByName("USER");
//       user.getRoles().add(userRole);
//         
//       userCredRepo.save(user);
//       
//       if (user.getId() == 1){
//           Role adminRole = roleServ.findByName("ADMINISTRATOR");
//           user.getRoles().add(adminRole);
//       }
//
//        UserProfile userProfile = new UserProfile(
//                user.getId(),
//                "Nuevo Usuario",
//                "Titulo del Portafolio",
//                "https://firebasestorage.googleapis.com/v0/b/ap-deploy-frontend-angular.appspot.com/o/defaultFiles%2Ffoto-perfil.jpg?alt=media&token=6d315045-d26d-4610-9dd3-bef0a7ef5d60",
//                "https://firebasestorage.googleapis.com/v0/b/ap-deploy-frontend-angular.appspot.com/o/defaultFiles%2Fbanner-mobile.jpg?alt=media&token=db5c877f-5b4b-4708-a1d6-d116304492e7",
//                "https://firebasestorage.googleapis.com/v0/b/ap-deploy-frontend-angular.appspot.com/o/defaultFiles%2Fbanner-desktop.jpg?alt=media&token=49698c92-bd42-4eed-a77f-014850de2361",
//                "Descripción del perfil del usuario",
//                "https://github.com/#",
//                "https://twitter.com/#",
//                "https://www.linkedin.com/#",
//                "http://localhost:4200/" + user.getUserName(),
//                user);
//
//        userProfileServ.profileCreate(userProfile);
//
//        userCredentialFindId(user.getId()).setUserProfile(userProfile);
//
////        fileServ.initStorage(user.getUserName());
//
//        return userProfileServ.profileFind(userProfile.getId());
//    }
//
//    @Override
//    public void userCredentialDelete(Long id) {    
////        UserCredentials user = userCredRepo.findById(id).orElse(null);
//          userCredRepo.deleteById(id);
////        fileServ.deleteStorage(user.getUserName());          
//    }
//
//    @Override
//    public UserCredentials userCredentialFindId(Long id) {
//        return userCredRepo.findById(id).orElse(null);
//    }
//
//    @Override
//    public UserCredentials userCredentialEdit(UserCredentials user) {
//         userCredRepo.save(user);
//        return  userCredRepo.findById(user.getId()).orElse(null);
//    }
//
////    @Override
////    public UserCredentials findByUsername(String username) {
////        return userCredRepo.findByUserName(username);
////    }
//
//    @Override
//    public UserCredentials findByUsername(String username) {
//        throw new UnsupportedOperationException("Not supported yet.");
//    }
//}