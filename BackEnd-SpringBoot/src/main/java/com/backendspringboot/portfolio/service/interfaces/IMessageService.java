package com.backendspringboot.portfolio.service.interfaces;

import com.backendspringboot.portfolio.model.Message;
import java.util.List;

public interface IMessageService {
    
    public List<Message> messageList();
    
    public List<Message> userMessageList(Long id);
    
    public void messageCreate (Message message);
    
    public void messageDelete (Long id);
    
    public Message messageFind (Long id);
    
    public Message messageEdit (Message message);
    
}
