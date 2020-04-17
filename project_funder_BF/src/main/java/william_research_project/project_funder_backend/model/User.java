package william_research_project.project_funder_backend.model;

import org.hibernate.annotations.Type;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import javax.xml.bind.DatatypeConverter;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Access(value = AccessType.FIELD)
public class User {
    //private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "surname")
    private String surname;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "pssword")
    private String pssword;

    private String description;


    @Column(name = "createddate")
    private Instant createddate;

    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id",referencedColumnName = "owner")
    private Account account;



    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    } */

    //@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    //@JoinColumn(name = "id",referencedColumnName = "creatorid")
    //private List<Project> project = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getPssword() {
        return pssword;
    }

    public void setPssword(String pssword) {
        this.pssword = pssword;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Instant getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Instant createddate) {
        this.createddate = createddate;
    }

    public User() {}

    public User(String email, String username, String surname, String firstname, String pssword, String description, Instant createddate) {
        this.email = email;
        this.username = username;
        this.surname = surname;
        this.firstname = firstname;
        this.pssword = pssword;
        this.description = description;
        this.createddate = createddate;
    }
    public User(String email,String pssword, String description) {
        this.email = email;
        this.pssword = pssword;
        this.description = description;
    }

    @Override
    public String toString(){
        return "User "+ id +" email= "+ email +" name= "+username;
    }

}
