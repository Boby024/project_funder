package william_research_project.project_funder_backend.model;

import java.time.Instant;

public class CommentCompletForm {
    private Integer userId;

    // project = identifier of the project
    private  Integer project;

    // comments => id of the comments
    private Integer comment;

    private Integer id;

    private Instant createddate;// id of the comment's table

    private String text;

    private String visibility;


    public CommentCompletForm() {}
    public CommentCompletForm(Integer userId, Integer project, Integer comment, String text, String visibility) {
        this.userId = userId;
        this.project = project;
        this.comment = comment;
        this.text = text;
        this.visibility = visibility;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Instant createddate) {
        this.createddate = createddate;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    @Override
    public String toString() {
        return "visibility "+visibility+" userId "+userId+" project "+project+ " text "+text;
    }
}
