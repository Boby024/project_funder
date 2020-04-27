package william_research_project.project_funder_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import william_research_project.project_funder_backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsernameAndPssword(String username, String pssword );
    User findByUsername(String username);
}
