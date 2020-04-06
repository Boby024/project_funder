package william_research_project.project_funder_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import william_research_project.project_funder_backend.model.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
}
