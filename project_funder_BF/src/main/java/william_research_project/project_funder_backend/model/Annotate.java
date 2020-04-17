package william_research_project.project_funder_backend.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@Entity
//@IdClass(Annotate.class)
@Table(name = "annotate")
public class Annotate {
    //@Id
    @Column(name = "userid")
    private Integer userId;

    //@OneToOne//(cascade = CascadeType.ALL)
    //@JoinColumn( name = "userid",referencedColumnName = "id")

    //@Id
    @Column(name = "project") // project = identifier of the project
    private  Integer project;
    //@OneToOne
    //@JoinColumn(name = "project", referencedColumnName = "identifier")

    @Id
    @Column(name = "comments") // comments => id of the comments
    private Integer comment;

    public Comment getComments() {
        return comments;
    }

    public void setComments(Comment comments) {
        this.comments = comments;
    }

    @OneToOne
    @JoinColumn(name = "comments",referencedColumnName = "id")
    private Comment comments;

    public Annotate() {}
    public Annotate(Integer userId, Integer project, Integer comment) {
        this.userId = userId;
        this.project = project;
        this.comment = comment;
    }
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProject() {
        return project;
    }

    public void setProject(Integer project) {
        this.project = project;
    }

    public Integer getComment() {
        return comment;
    }

    public void setComment(Integer comment) {
        this.comment = comment;
    }

    @Override
    public String toString(){
        return "userId= "+ userId +" project= "+ project +" comment= "+comment;
    }

}
