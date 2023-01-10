package com.backendspringboot.portfolio.controller;

import com.backendspringboot.portfolio.model.Message;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.service.MessageService;
import com.backendspringboot.portfolio.service.UserProfileService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class MessageController {
    
    @Autowired
    private MessageService messageServ;

    @Autowired
    private UserProfileService userProfileServ;

    @PostMapping("/new-message/{id}")
    public Message messageCreate(@PathVariable Long id, @RequestBody Message message) {
        UserProfile userProfile = userProfileServ.profileFind(id);

        if (userProfile != null) {
            message.setUserProfile(userProfile);
            messageServ.messageCreate(message);
        }
        return messageServ.messageFind(message.getId());
    }

    @GetMapping("/message-list/{id}")
    @ResponseBody
    public List<Message> messageList(@PathVariable Long id) {
        return messageServ.userMessageList(id);
    }

    @DeleteMapping("/delete-message/{id}")
    public void messageDelete(@PathVariable Long id) {
        Message message = messageServ.messageFind(id);

        if (message.getUserProfile() != null) {

            message.setUserProfile(null);
        }
        messageServ.messageDelete(id);
    }

    @PutMapping("/edit-message")
    @ResponseBody
    public Message messageEdit(@RequestBody Message message) {
        return messageServ.messageEdit(message);
    }

    @GetMapping("/find-message/{id}")
    @ResponseBody
    public Message messageFind(@PathVariable Long id) {
        return messageServ.messageFind(id);
    }   
    
}
