package william_research_project.project_funder_backend.controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import william_research_project.project_funder_backend.dto.AccountResponse;
import william_research_project.project_funder_backend.exception.ResourceNotFoundException;
import william_research_project.project_funder_backend.model.Account;
import william_research_project.project_funder_backend.model.Profilimage;
import william_research_project.project_funder_backend.model.User;
import william_research_project.project_funder_backend.repository.AccountRepository;
import william_research_project.project_funder_backend.repository.ProfilImageRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/projectfunder")
public class AccountController {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ProfilImageRepository profilImageRepository;

    @GetMapping("/getAccount/{owner}")
    public ResponseEntity<Account> getAccount(@PathVariable(value = "owner") Integer owner)
            throws ResourceNotFoundException {
        System.out.println("Get Account with owner-ID = " + owner + "...");
        Account account = accountRepository.findById(owner)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + owner));
        return ResponseEntity.ok().body(account);
    }

    @GetMapping("/getAccountById/{owner}")
    public ResponseEntity<JSONObject> getAccountById(@PathVariable(value = "owner") Integer owner) {
        System.out.println("Get Account with owner-ID = " + owner + "...");
        JSONObject object = new JSONObject();
        object.put("owner",null);
        object.put("credit",null);
        object.put("secretnumber",null);
        object.put("user",null);
        object.put("profilimage",null);

        JSONObject object2 = new JSONObject();
        object2.put("id",null);
        object2.put("filesize",null);
        object2.put("lastmodified",null);
        object2.put("filetype",null);
        object2.put("image",null);

        User user = new User();
        Account _account = accountRepository.getOne(owner);
        // Account _account = account.get();
        object.replace("owner",_account.getOwner());
        object.replace("credit",_account.getCredit());
        object.replace("secretnumber",_account.getSecretnumber());
        object.replace("user",_account.getUser());

        if (_account.getUser().getIdprofilimage() != null) {
            Profilimage profilimage = profilImageRepository.getOne(_account.getUser().getIdprofilimage());
            object2.replace("id",profilimage.getId());
            object2.replace("filesize",profilimage.getFilesize());
            object2.replace("lastmodified",profilimage.getLastmodified());
            object2.replace("filetype",profilimage.getFiletype());
            object2.replace("image",profilimage.getImage());

            object.replace("profilimage",object2);
        }
        return ResponseEntity.ok().body(object);
    }

    @GetMapping("/getJoinInfoAccount/")
    public AccountResponse getJoinInfoAccount() {
        return accountRepository.getJoinInformation();
    }
}
