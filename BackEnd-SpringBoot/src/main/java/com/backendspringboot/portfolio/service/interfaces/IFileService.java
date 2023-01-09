package com.backendspringboot.portfolio.service.interfaces;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    
    public void saveFile(String directoryName, MultipartFile file) throws Exception;
       
    public void saveFiles(String directoryName, List<MultipartFile> files) throws Exception;
        
    public String deleteFile(String directoryName, String filename);
    
    public String initStorage(String username);
    
    public String deleteStorage(String username);
    
    public String getUrlUploads(String directoryName);
}
