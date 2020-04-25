package william_research_project.project_funder_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import william_research_project.project_funder_backend.model.Donate;

import java.util.List;

public interface DonateRepository extends JpaRepository<Donate,Integer> {
    List<Donate> findAllByProject(Integer project);
    Donate findByDonatorIdAndProject(Integer donatorId, Integer project);
    List<Donate> findAllByDonatorId(Integer donatorId);
    // List<Donate> fin
}
