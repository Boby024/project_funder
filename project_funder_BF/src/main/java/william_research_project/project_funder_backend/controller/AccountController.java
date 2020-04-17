package william_research_project.project_funder_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import william_research_project.project_funder_backend.dto.AccountResponse;
import william_research_project.project_funder_backend.exception.ResourceNotFoundException;
import william_research_project.project_funder_backend.model.Account;
import william_research_project.project_funder_backend.repository.AccountRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class AccountController {
    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/getAccount/{owner}")
    public ResponseEntity<Account> getUser(@PathVariable(value = "owner") Integer owner)
            throws ResourceNotFoundException {
        System.out.println("Get Account with owner-ID = " + owner + "...");
        Account account = accountRepository.findById(owner)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + owner));
        return ResponseEntity.ok().body(account);
    }

    @GetMapping("/getJoinInfoAccount/")
    public AccountResponse getJoinInfoAccount() {
        return accountRepository.getJoinInformation();
    }
}
