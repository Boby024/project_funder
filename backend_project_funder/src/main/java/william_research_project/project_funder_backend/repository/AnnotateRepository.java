package william_research_project.project_funder_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import william_research_project.project_funder_backend.model.Annotate;

import java.util.List;

public interface AnnotateRepository extends JpaRepository<Annotate,Integer> {
    List<Annotate> findByProject( Integer project);
}
