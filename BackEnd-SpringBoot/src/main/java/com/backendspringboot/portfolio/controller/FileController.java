package com.backendspringboot.portfolio.controller;

import static com.backendspringboot.portfolio.commons.Constants.FRONTEND_URL;
import com.backendspringboot.portfolio.service.FileService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin (FRONTEND_URL)
@Controller
public class FileController {

    @Autowired
    private FileService fileService;
    
    @PostMapping("/uploads/{directoryName}")
    public ResponseEntity<String> uploadFiles(@PathVariable String directoryName, @RequestParam("files") List<MultipartFile> files) {
        try {
            fileService.saveFiles(directoryName, files);
            return ResponseEntity.status(HttpStatus.OK).body("file(s) uploaded successfully");
            
        } catch (Exception e) {    
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error uploading file(s)");
        } 
    } 

    @DeleteMapping("/delete/{directoryName}/{filename}")
    public ResponseEntity<String> deleteFile(@PathVariable String directoryName, @PathVariable String filename){
       try {
           fileService.deleteFile(directoryName, filename);
           return ResponseEntity.status(HttpStatus.OK).body("file deleted");
           
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error deleting file");
       }
    }
        
}