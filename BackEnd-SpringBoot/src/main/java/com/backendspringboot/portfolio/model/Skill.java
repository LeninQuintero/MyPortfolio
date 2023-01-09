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
@Table(name = "skill")
public class Skill implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "title", nullable = false, length = 12)
    private String title;

    @Column(name = "icon_name", length = 45)
    private String iconName;

    @Column(name = "level", nullable = false, length = 100)
    private String level;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    public Skill() {
    }

    public Skill(String title, String iconName, String level, UserProfile userProfile) {
        this.title = title;
        this.iconName = iconName;
        this.level = level;
        this.userProfile = userProfile;
    }
}
