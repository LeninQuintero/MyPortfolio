package com.backendspringboot.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "message")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Column(name = "subject", nullable = false, length = 100)
    private String subject;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "message", nullable = false, length = 800)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    public Message() {
    }

    public Message(String name, String subject, String email, String message, UserProfile userProfile) {
        this.name = name;
        this.subject = subject;
        this.email = email;
        this.message = message;
        this.userProfile = userProfile;
    }
}
