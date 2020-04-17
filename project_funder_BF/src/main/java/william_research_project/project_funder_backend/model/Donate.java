package william_research_project.project_funder_backend.model;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "donate")
public class Donate {

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "donatorid")
    private Integer donatorId; // user Id

    @Column(name = "project")
    private Integer project; // project id

    @Column(name = "donationamount",precision = 10,scale = 2)
    private Double donationamount;

    @Column(name = "visibility")
    private String visibility;

    @Column(name = "createddate")
    private Instant createddate;

    public Donate() {}
    public Donate(Integer donatorId,Integer project, Double donationamount, String visibility, Instant createddate) {
        this.donatorId = donatorId;
        this.project = project;
        this.donationamount = donationamount;
        this.visibility = visibility;
        this.createddate = createddate;
    }

    public Integer getDonatorId() {
        return donatorId;
    }

    public void setDonatorId(Integer donatorId) {
        this.donatorId = donatorId;
    }

    public Integer getProject() {
        return project;
    }

    public void setProject(Integer project) {
        this.project = project;
    }

    public Double getDonationamount() {
        return donationamount;
    }

    public void setDonationamount(Double donationamount) {
        this.donationamount = donationamount;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public Instant getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Instant createddate) {
        this.createddate = createddate;
    }
    @Override
    public String toString(){
        return "donatorId= "+ donatorId +" project_id= "+ project +" visibility= "+visibility;
    }
}
