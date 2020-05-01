package william_research_project.project_funder_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import william_research_project.project_funder_backend.dto.AccountResponse;
import william_research_project.project_funder_backend.model.Account;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    //Account findAccountByOwner(int owner);
    //List<Account> findAccountByOwner(Integer owner);


    @Override
    Account getOne(Integer integer);

    @Query("SELECT new william_research_project.project_funder_backend.dto.AccountResponse(a.owner , u.id) FROM Account a JOIN a.user u")
    public AccountResponse getJoinInformation();

}
