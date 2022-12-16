package com.backendspringboot.portfolio.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    
    public void save(MultipartFile file) throws Exception;
       
    public void save(List<MultipartFile> files) throws Exception;
    
}
