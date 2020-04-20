package william_research_project.project_funder_backend.model;

import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "project")
@Access(value = AccessType.FIELD)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "identifier")
    private Integer identifier;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status; // radio button by frontend: only make a choice between "active" and "closed"

    @Column(name = "fundinglimit", precision = 10, scale = 2)
    private Double fundinglimit;

    @Column(name = "creatorid",nullable = false)//,insertable = false,updatable = false)
    private Integer creatorId;

    @Column(name = "predecessor")
    private Integer predecessor;

    @Column(name = "categorieid")
    private Integer categorieId;


    @Column(name = "createddate")
    private Instant createddate;


    public String getUser() {return this.user.getUsername();}

    public void setUser(User user) {
        this.user = user;
    }
    @ManyToOne(optional = false)//(cascade = CascadeType.ALL)
    @JoinColumn( name = "creatorid",referencedColumnName = "id",insertable = false,updatable = false) // referencedColumnName = "id"
    private User user;

    public List<Project> getProject() {
        return project;
    }
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "predecessor",referencedColumnName = "identifier",insertable = false,updatable = false)// referencedColumnName = "id")
    private List<Project> project;

     /*public Categorie getCategorie() {
        return categorie;
    }


    public List<Project> getProject() {
        return project;
    }

    public void setProject(List<Project> project) {
        this.project = project;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

   public User getUser() {return this.user;}

    public void setUser(User user) {
        this.user = user;
    }
    @ManyToOne(optional = false)//(cascade = CascadeType.ALL)
    @JoinColumn( name = "creatorid",referencedColumnName = "id",insertable = false,updatable = false) // referencedColumnName = "id"
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "categorieid",referencedColumnName = "id",insertable = false,updatable = false)// referencedColumnName = "id")
    private Categorie categorie;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "predecessor",referencedColumnName = "identifier",insertable = false,updatable = false)// referencedColumnName = "id")
    private List<Project> project; */

    // standart for Postgresql when the data arrive
    public Integer getIdentifier() {
        return identifier;
    }

    public void setIdentifier(Integer identifier) {
        this.identifier = identifier;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getFundinglimit() {
        return fundinglimit;
    }

    public void setFundinglimit(Double fundinglimit) {
        this.fundinglimit = fundinglimit;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    public Integer getPredecessor() {
        return predecessor;
    }

    public void setPredecessor(Integer predecessor) {
        this.predecessor = predecessor;
    }

    public Integer getCategorieId() {
        return categorieId;
    }

    public void setCategorieId(Integer categorieId) {
        this.categorieId = categorieId;
    }

    public Instant getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Instant createddate) {
        this.createddate = createddate;
    }


    public Project() {}
    public Project(String title, String description, String status, Double fundinglimit, Integer creatorId, Integer predecessor, Integer categorieId, Instant createddate) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.fundinglimit = fundinglimit;
        this.creatorId = creatorId;
        this.predecessor = predecessor;
        this.categorieId = categorieId;
        this.createddate = createddate;
    }

    @Override
    public String toString(){
        return "Project "+ identifier +" title= "+ title +" description= "+description+" fundinglimit= "+fundinglimit+" creatorId= "+creatorId;
    }


}
