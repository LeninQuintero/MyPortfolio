package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.model.Certification;
import java.util.List;

public interface ICertificationService {
    
    public List<Certification> certificationList();
    
    public List<Certification> userCertificationList(Long id);
    
    public void certificationCreate (Certification certification);
    
    public void certificationDelete (Long id);
    
    public Certification certificationFind (Long id);
    
    public Certification certificationEdit (Certification certification);
    
}
