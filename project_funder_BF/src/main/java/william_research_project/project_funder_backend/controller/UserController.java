package william_research_project.project_funder_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import william_research_project.project_funder_backend.exception.ResourceNotFoundException;
import william_research_project.project_funder_backend.model.Account;
import william_research_project.project_funder_backend.model.User;
import william_research_project.project_funder_backend.repository.AccountRepository;
import william_research_project.project_funder_backend.repository.UserRepository;

import javax.validation.Valid;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        System.out.println("all usres");
        return userRepository.findAll();
    }

    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @PostMapping(value = "/user/create")
    public User createUser(@Valid @RequestBody User user) {
        System.out.println("store user");
        //String imageData = user["image"];
        //byte[] imageByte = imageData.getBytes(StandardCharsets.UTF_8);
        Instant timestamp = Instant.now();
        User _user = userRepository.save(new User(user.getEmail(), user.getUsername(), user.getSurname(), user.getFirstname(), user.getPssword(), user.getDescription(), timestamp ) );
        try {
            Integer id_user = _user.getId();
            if (id_user != null) {
                // secretnummber generate by another function, but i set it here some value just for testing
                accountRepository.save( new Account(id_user,00.00,"JNnam29KD"));
            }
        } catch (Exception e){
            System.out.println("user don't exists now");
        }
        return _user;
    }

    @PutMapping("/account/{id}")
    public ResponseEntity<Account> deposit(@PathVariable(value = "id") Integer userId, @Valid @RequestBody Account account)
            throws ResourceNotFoundException{
        System.out.println("Get Account number with ID = " + userId + "...");
        Account _account = accountRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));
        _account.setCredit(account.getCredit());
        final Account updateAccount = accountRepository.save(_account);
        return ResponseEntity.ok(updateAccount);
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUser(@PathVariable(value = "id") Integer userId)
        throws ResourceNotFoundException{
        System.out.println("Get User with ID = " + userId + "...");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/putUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Integer userId, @Valid @RequestBody User user)
        throws ResourceNotFoundException {
        System.out.println("Update User with ID = " + userId + "...");
        User _user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

        _user.setEmail(user.getEmail());
        _user.setDescription(user.getDescription());
        _user.setPssword(user.getPssword());
        //_user.setCreateddate(Instant.now());
        // byte[] fileBase64 = user.getImage();

        // _user.setImage(user.getImage() ); // DatatypeConverter.parseBase64Binary(user.getImage())

        final User updatedUser = userRepository.save(_user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/deleteUser/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Integer userId)
            throws ResourceNotFoundException {
        System.out.println("Delete User with ID = " + userId + "...");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + userId));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
