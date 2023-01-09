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
@Table(name = "project")
public class Project implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Column(name = "url_project_img", length = 100)
    private String urlProjectImg;

    @Column(name = "url_project", length = 100)
    private String urlProject;

    @Column(name = "description", length = 200)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    public Project() {
    }

    public Project(String title, String urlProjectImg, String urlProject, String description, UserProfile userProfile) {
        this.title = title;
        this.urlProjectImg = urlProjectImg;
        this.urlProject = urlProject;
        this.description = description;
        this.userProfile = userProfile;
    }
}
