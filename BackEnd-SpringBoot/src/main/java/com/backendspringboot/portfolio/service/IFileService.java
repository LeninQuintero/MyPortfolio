package com.backendspringboot.portfolio.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    
    public void saveFile(MultipartFile file) throws Exception;
       
    public void saveFiles(List<MultipartFile> files) throws Exception;
        
    public String deleteFile(String filename);
    
}
