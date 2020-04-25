package william_research_project.project_funder_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import william_research_project.project_funder_backend.model.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Integer> {
    List<Project> findByIdentifier(Integer identifier);
    List<Project> findByCreatorId(Integer creatorid);
    Project findByIdentifierAndCreatorId(Integer identifier, Integer creatorId);
    // List<Project> findByUser (String user);
    //Project findByPredecessor(Integer predecessor);
}
