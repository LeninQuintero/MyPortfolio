package com.backendspringboot.portfolio.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService implements IFileService {

    private final Path rootFolder = Paths.get("src/main/resources/static/uploads");

    @Override
    public void saveFile(MultipartFile file) throws Exception {
        Files.copy(file.getInputStream(), this.rootFolder.resolve(file.getOriginalFilename()));
    }

    @Override
    public void saveFiles(List<MultipartFile> files) throws Exception {
        for (MultipartFile file : files) {
            this.saveFile(file);
        }
    }

    @Override
    public String deleteFile(String filename) {
        try {
            Files.deleteIfExists(this.rootFolder.resolve(filename));
            return "Deleted";
        } catch (IOException e) {
            return "Error deleting";
        }
    }

}
