package com.backendspringboot.portfolio.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService implements IFileService{
    
    private final Path rootFolder = Paths.get("uploads");
    
    
    @Override
    public void save(MultipartFile file) throws Exception {
        Files.copy(file.getInputStream(), this.rootFolder.resolve(file.getOriginalFilename()));
    }

    @Override
    public Resource load(String name) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void save(List<MultipartFile> files) throws Exception {
        for (MultipartFile file : files){
            this.save(file);
        }
    }

    @Override
    public Stream<Path> loadAll() throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
