package com.backendspringboot.portfolio.service;

import com.backendspringboot.portfolio.model.Message;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.repository.MessageRepository;
import com.backendspringboot.portfolio.repository.UserProfileRepository;
import com.backendspringboot.portfolio.service.interfaces.IMessageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService implements IMessageService {

    @Autowired
    public UserProfileRepository userProfileRepo;

    @Autowired
    public MessageRepository messageRepo;

    @Override
    public List<Message> messageList() {
        return messageRepo.findAll();
    }

    @Override
    public List<Message> userMessageList(Long id) {
        UserProfile user = userProfileRepo.findById(id).orElse(null);
        return messageRepo.findByUserProfile(user);
    }

    @Override
    public void messageCreate(Message message) {
        messageRepo.save(message);
    }

    @Override
    public void messageDelete(Long id) {
        messageRepo.deleteById(id);
    }

    @Override
    public Message messageFind(Long id) {
        return messageRepo.findById(id).orElse(null);
    }

    @Override
    public Message messageEdit(Message message) {
        Message messageDB = messageRepo.findById(message.getId()).orElse(null);
        message.setUserProfile(messageDB.getUserProfile());
        messageRepo.save(message);
        return messageRepo.findById(message.getId()).orElse(null);
    }

}
