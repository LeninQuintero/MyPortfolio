
package com.backendspringboot.portfolio.security.service;

import com.backendspringboot.portfolio.security.enums.entity.UserCredentials;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backendspringboot.portfolio.security.repository.IUserCredentialsRepository;
import java.util.List;

@Service
@Transactional
public class UserCredentialsService {
    @Autowired
    IUserCredentialsRepository IUserCredRepo;
    
    public Optional<UserCredentials> findByUsername(String userName){
        return IUserCredRepo.findByUserName(userName);
    }
    
    public boolean existsByUserName (String userName){
        return IUserCredRepo.existsByUserName(userName);
    }
    
    public void save(UserCredentials user){
        IUserCredRepo.save(user);
    }

    public UserCredentials userCredentialFindId(Long id) {
        return IUserCredRepo.findById(id).orElse(null);
    }
    

    public void userCredentialDelete(Long id) {    
          IUserCredRepo.deleteById(id);         
    }

    public UserCredentials userCredentialEdit(UserCredentials user) {
         IUserCredRepo.save(user);
        return  IUserCredRepo.findById(user.getId()).orElse(null);
    }

    
    
        public List<UserCredentials> userCredentialList() {
 
        return  IUserCredRepo.findAll();
    }
    
    
    
    
    
    
}