package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Certification;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.CertificationRepository;
import com.backendspringboot.portfolio.repository.UserProfileRepository;
import com.backendspringboot.portfolio.service.interfaces.ICertificationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CertificationService implements ICertificationService {

    @Autowired
    public UserProfileRepository userProfileRepo;

    @Autowired
    public CertificationRepository certificationRepo;

    @Override
    public List<Certification> certificationList() {
        return certificationRepo.findAll();
    }

    @Override
    public List<Certification> userCertificationList(Long id) {
        UserProfile user = userProfileRepo.findById(id).orElse(null);
        return certificationRepo.findByUserProfile(user);
    }

    @Override
    public void certificationCreate(Certification certification) {
        certificationRepo.save(certification);
    }

    @Override
    public void certificationDelete(Long id) {
        certificationRepo.deleteById(id);
    }

    @Override
    public Certification certificationFind(Long id) {
        return certificationRepo.findById(id).orElse(null);
    }

    @Override
    public Certification certificationEdit(Certification certification) {
        Certification certDB = certificationRepo.findById(certification.getId()).orElse(null);
        certification.setUserProfile(certDB.getUserProfile());
        certificationRepo.save(certification);
        return certificationRepo.findById(certification.getId()).orElse(null);
    }

}
