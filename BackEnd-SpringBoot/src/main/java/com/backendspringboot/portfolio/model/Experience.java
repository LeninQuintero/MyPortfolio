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
@Table(name = "experience")
public class Experience implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "position", nullable = false, length = 45)
    private String position;

    @Column(name = "company_name", nullable = false, length = 100)
    private String companyName;

    @Column(name = "url_company_logo", length = 100)
    private String urlCompanyLogo;

    @Column(name = "current_job", nullable = false)
    private Boolean currentJob;

    @Column(name = "start_date", nullable = false)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date endDate;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "description", nullable = false, length = 600)
    private String description;

    @ManyToOne( fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    public Experience() {
    }

    public Experience(String position, String companyName, String urlCompanyLogo, 
            Boolean currentJob, Date startDate, Date endDate, String location, 
            String description, UserProfile userProfile) {
        this.position = position;
        this.companyName = companyName;
        this.urlCompanyLogo = urlCompanyLogo;
        this.currentJob = currentJob;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.description = description;
        this.userProfile = userProfile;
    }
}
