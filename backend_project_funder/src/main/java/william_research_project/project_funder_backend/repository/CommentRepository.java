package william_research_project.project_funder_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import william_research_project.project_funder_backend.model.Comment;

import java.util.List;

public interface CommentRepository  extends JpaRepository<Comment,Integer> {
    List<Comment> findAllById(Integer id);
}
