
package com.backendspringboot.portfolio.security.controller;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ServerMessage {
    private String message;
    

    public ServerMessage() {
    }

    public ServerMessage(String message) {
        this.message = message;
    }
    
}