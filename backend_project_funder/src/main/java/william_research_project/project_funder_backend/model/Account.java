package william_research_project.project_funder_backend.model;


import javax.persistence.*;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @Column(name = "owner")
    private Integer owner;

    @Column(name = "credit",precision = 10, scale = 2)
    private Double credit;

    @Column(name = "secretnumber")
    private String secretnumber;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner",referencedColumnName = "id")
    private User user;

    public long getOwner() {
        return owner;
    }

    public void setOwner(Integer owner) {
        this.owner = owner;
    }

    public Double getCredit() {
        return credit;
    }

    public void setCredit(Double credit) {
        this.credit = credit;
    }

    public String getSecretnumber() {
        return secretnumber;
    }

    public void setSecretnumber(String secretnumber) {
        this.secretnumber = secretnumber;
    }

    public Account(){}
    public Account(Integer owner, Double credit, String secretnumber) {
        this.owner = owner;
        this.credit = credit;
        this.secretnumber = secretnumber;
    }


}
