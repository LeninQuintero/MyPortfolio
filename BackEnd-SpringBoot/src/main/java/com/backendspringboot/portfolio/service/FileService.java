package com.backendspringboot.portfolio.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FileUtils;

@Service
public class FileService implements IFileService {

    private String urlUploads = "src/main/resources/static/uploads";

    @Override
    public void saveFile(String directoryName, MultipartFile file) throws Exception {
        String url = this.urlUploads + "/" + directoryName;
        Path rootFolder = Paths.get(url);
        Files.copy(file.getInputStream(), rootFolder.resolve(file.getOriginalFilename()));
    }

    @Override
    public void saveFiles(String directoryName, List<MultipartFile> files) throws Exception {
        for (MultipartFile file : files) {
            this.saveFile(directoryName, file);
        }
    }

    @Override
    public String deleteFile(String directoryName, String filename) {
        String url = this.urlUploads + "/" + directoryName;
        Path rootFolder = Paths.get(url);
        try {
            Files.deleteIfExists(rootFolder.resolve(filename));
            return "Deleted";
        } catch (IOException e) {
            return "Error deleting";
        }
    }

    @Override
    public String initStorage(String username) {
        String UrlUserStorage = this.urlUploads + "/" + username;
        Path userFolder = Paths.get(UrlUserStorage);
        try {
            Files.createDirectory(userFolder);
            return "directory created successfully";
        } catch (IOException ex) {
            return "error, directory not created";
        }
    }

    @Override
    public String getUrlUploads(String directoryName) {
        return this.urlUploads + "/" + directoryName;
    }

    @Override
    public String deleteStorage(String username) {
        String urlUserStorage = urlUploads + "/" + username;
        File userFolder = new File(urlUserStorage);

        try {
            FileUtils.deleteDirectory(userFolder);
            return "directory deleted successfully";
        } catch (IOException ex) {
            return "error, directory not deleted";
        }
    }

}
