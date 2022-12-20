package com.backendspringboot.portfolio.service;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    public void init();
    
    public void saveFile(MultipartFile file) throws Exception;
       
    public void saveFiles(List<MultipartFile> files) throws Exception;
    
    public void deleteAll();
    
    public Stream<Path> loadAll();
    
    public String deleteFile(String filename);
    
}
