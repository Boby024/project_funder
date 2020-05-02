package william_research_project.project_funder_backend.controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import william_research_project.project_funder_backend.model.Annotate;
import william_research_project.project_funder_backend.model.Comment;
import william_research_project.project_funder_backend.model.CommentCompletForm;
import william_research_project.project_funder_backend.repository.AnnotateRepository;
import william_research_project.project_funder_backend.repository.CommentRepository;

import javax.validation.Valid;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/projectfunder")
public class AnnotateController {
    @Autowired
    AnnotateRepository annotateRepository;

    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/getAnnotates")
    public List<Annotate> getAnnotates() {
        System.out.println("all annotates");
        return annotateRepository.findAll();
    }

    // this method is better than commentsFromProjectID
    @GetMapping("/commentsProjetcId/{projectId}")
    public List<Annotate> commentsProjetcId(@PathVariable(value = "projectId") Integer projectId) {
        System.out.println("all comments from project ID: "+projectId);
        return annotateRepository.findByProject(projectId);
    }

    @PostMapping("/createComment")
    public JSONObject createUser(@Valid @RequestBody CommentCompletForm commentCompletForm) {
        System.out.println("store comment...");
        System.out.println(commentCompletForm.toString());
        //Integer id_comment = null;
        JSONObject object = new JSONObject();
        try {
            Instant timestamp = Instant.now();
            Comment comment =  commentRepository.save(new Comment(commentCompletForm.getText(),timestamp,commentCompletForm.getVisibility()));
            System.out.println(comment);
            //id_comment = comment.getId();

            if(comment.getId() != null) {
                object.put("commentId",comment.getId());
                object.put("text",comment.getText());
                object.put("createddate",comment.getCreateddate());
                object.put("visibility",comment.getVisibility());
                Annotate annotate = annotateRepository.save(new Annotate(commentCompletForm.getUserId(),commentCompletForm.getProject(),comment.getId()));
                System.out.println(annotate);
                object.put("userId",annotate.getUserId());
                object.put("projectId",annotate.getProject());
                object.put("comment_id",annotate.getComment());
            }

        } catch (Exception e) {
            System.out.println("cann't store comment or cann't store comments Annotate");// if cann't store comment firstly
        }

        return object;
        //Annotate _categorie = annotateRepository.save(new Categorie(categorie.getName() ) );
        //return _categorie;
    }

    // 2. alternativ
    @GetMapping("/commentsFromProjectID/{projectId}")
    public List<Comment> commentsFromProjectID(@PathVariable(value = "projectId") Integer projectId) {
        List<Annotate> annotates = annotateRepository.findByProject(projectId);
        List<Comment> comments = new ArrayList<>();
        if( annotates.size() > 0) {
            for( int i = 0; i < annotates.size(); i++) {
                Integer comment_Id = annotates.get(i).getComment();
                List<Comment> commentList = commentRepository.findAllById(comment_Id);//findAllById(Collections.singleton(comment_Id));
                if (!commentList.isEmpty()) {
                    for (int j = 0; j < commentList.size(); j++) {
                        comments.add(commentList.get(j));
                    }
                }
            }
        }
        return comments;
    }

}
