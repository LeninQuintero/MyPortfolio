package com.backendspringboot.portfolio.service;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import javax.annotation.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    public void save(MultipartFile file) throws Exception;
    
    public Resource load(String name) throws Exception;
    
    public void save(List<MultipartFile> files) throws Exception;
    
    public Stream<Path> loadAll() throws Exception;
}
