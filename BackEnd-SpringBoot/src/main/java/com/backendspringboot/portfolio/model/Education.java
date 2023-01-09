package com.backendspringboot.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "education")
public class Education implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "institute", nullable = false, length = 45)
    private String institute;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Column(name = "url_institute_logo", length = 100)
    private String urlInstituteLogo;

    @Column(name = "current_study", nullable = false)
    private Boolean currentStudy;

    @Column(name = "finish_date", nullable = false)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date finishDate;

    @Column(name = "location", nullable = false, length = 100)
    private String location;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    public Education() {
    }

    public Education(String institute, String title, String urlInstituteLogo, Boolean currentStudy, Date finishDate, String location, UserProfile userProfile) {
        this.institute = institute;
        this.title = title;
        this.urlInstituteLogo = urlInstituteLogo;
        this.currentStudy = currentStudy;
        this.finishDate = finishDate;
        this.location = location;
        this.userProfile = userProfile;
    }
}
