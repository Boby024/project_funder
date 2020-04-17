package william_research_project.project_funder_backend.dto;

public class AccountResponse {

    private Integer owner;
    private Integer id;

    public AccountResponse(Integer owner, Integer id) {
        this.owner = owner;
        this.id = id;
    }

    public Integer getOwner() {
        return owner;
    }

    public void setOwner(Integer owner) {
        this.owner = owner;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
