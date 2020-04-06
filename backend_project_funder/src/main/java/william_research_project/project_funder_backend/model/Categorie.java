package william_research_project.project_funder_backend.model;

import javax.persistence.*;

@Entity
@Table(name = "categories")
@Access(value = AccessType.FIELD)
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;


    /*@Column(name = "icon")
        byte[] icon;*/
    /*@OneToOne(mappedBy = "categorie", cascade = CascadeType.ALL)
    private Project project;
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    } */

    /*public Categorie(String name, byte[] icon) {
        this.name = name;
        this.icon = icon;
    }*/
    /*@OneToOne(mappedBy = "categorie")
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }*/
    public Categorie(){}
    public Categorie(String name) {
        this.name = name;
    }
    public Categorie(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*public byte[] getIcon() {
        return icon;
    }

    public void setIcon(byte[] icon) {
        this.icon = icon;
    }*/

}
