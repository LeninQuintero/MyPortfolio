package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.Certification;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.CertificationService;
import com.backendspringboot.portfolio.service.UserProfileService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class CertificationController {

    @Autowired
    private CertificationService certificationServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-certification/{id}")
    public Certification certificationCreate(@PathVariable Long id, @RequestBody Certification certification) {
        UserProfile userProfile = userProfileServ.profileFind(id);

        if (userProfile != null) {
            certification.setUserProfile(userProfile);
            certificationServ.certificationCreate(certification);
        }
        return certificationServ.certificationFind(certification.getId());
    }

    @GetMapping("/certification-list/{id}")
    @ResponseBody
    public List<Certification> certificationList(@PathVariable Long id) {
        return certificationServ.userCertificationList(id);
    }

    @DeleteMapping("/delete-certification/{id}")
    public void certificationDelete(@PathVariable Long id) {
        Certification certification = certificationServ.certificationFind(id);

        if (certification.getUserProfile() != null) {

            certification.setUserProfile(null);
        }
        certificationServ.certificationDelete(id);
    }

    @PutMapping("/edit-certification")
    @ResponseBody
    public Certification certificationEdit(@RequestBody Certification certification) {
        return certificationServ.certificationEdit(certification);
    }

    @GetMapping("/find-certification/{id}")
    @ResponseBody
    public Certification certificationFind(@PathVariable Long id) {
        return certificationServ.certificationFind(id);
    }
}
