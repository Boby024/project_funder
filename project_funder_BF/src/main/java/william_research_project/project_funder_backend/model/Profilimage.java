package william_research_project.project_funder_backend.model;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Entity
@Table(name = "profilimage")
public class Profilimage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "image")
    private byte[] image;

    @Column(name = "filesize")
    private Integer filesize;

    @Column(name = "lastmodified")
    private Long lastmodified;

    @Column(name = "filetype")
    private String filetype;

    public String getImageStringForm() {
        return imageStringForm;
    }

    public void setImageStringForm(String imageStringForm) {
        this.imageStringForm = imageStringForm;
    }

    private String imageStringForm;

    public Profilimage() {}
    public Profilimage(byte[] image, Integer filesize, Long lastmodified, String filetype) {
        this.image = image;
        this.filesize = filesize;
        this.lastmodified = lastmodified;
        this.filetype = filetype;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImage() {
        //byte[] decodedString = Base64.getDecoder().decode(new String(image, StandardCharsets.UTF_8));
        byte[] decodedString = Base64.getDecoder().decode(new String(image).getBytes(StandardCharsets.UTF_8));
        return new String(decodedString, StandardCharsets.UTF_8);
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Integer getFilesize() {
        return filesize;
    }

    public void setFilesize(Integer filesize) {
        this.filesize = filesize;
    }

    public Long getLastmodified() {
        return lastmodified;
    }

    public void setLastmodified(Long lastmodified) {
        this.lastmodified = lastmodified;
    }

    public String getFiletype() {
        return filetype;
    }

    public void setFiletype(String filetype) {
        this.filetype = filetype;
    }

    @Override
    public String toString(){
        return "id pic "+ id +" filetype = "+ filetype +" filesize= "+filesize;
    }

}
