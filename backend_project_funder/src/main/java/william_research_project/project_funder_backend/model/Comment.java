package william_research_project.project_funder_backend.model;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "text")
    private String text;

    @Column(name = "createddate")
    private Instant createddate;

    @Column(name = "visibility")
    private String visibility;

    public Comment() {}
    public Comment(String text, Instant createddate, String visibility) {
        this.text = text;
        this.createddate = createddate;
        this.visibility = visibility;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Instant getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Instant createddate) {
        this.createddate = createddate;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    @Override
    public String toString(){
        return "id= "+ id +" createddate= "+ createddate +" visibility= "+visibility;
    }
}
