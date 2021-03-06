package william_research_project.project_funder_backend.controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import william_research_project.project_funder_backend.exception.ResourceNotFoundException;
import william_research_project.project_funder_backend.model.Account;
import william_research_project.project_funder_backend.model.Profilimage;
import william_research_project.project_funder_backend.model.User;
import william_research_project.project_funder_backend.repository.AccountRepository;
import william_research_project.project_funder_backend.repository.ProfilImageRepository;
import william_research_project.project_funder_backend.repository.ProjectRepository;
import william_research_project.project_funder_backend.repository.UserRepository;

import javax.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;


@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/projectfunder")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ProfilImageRepository profilImageRepository;

    String salt = "learnByDoing08263ThingBjrBsrGro";

    public JSONObject loggedJsonObject(User user) {
        JSONObject object = new JSONObject();
        object.put("id", user.getId());
        object.put("username", user.getUsername());
        object.put("right","standard");
        object.put("profilimage",null);

        JSONObject object2 = new JSONObject();
        object2.put("id",null);
        object2.put("filesize",null);
        object2.put("lastmodified",null);
        object2.put("filetype",null);
        object2.put("image",null);

        Profilimage profilimage = profilImageRepository.getOne(user.getIdprofilimage());
        if (!profilimage.equals(null)) {
            object2.replace("id",profilimage.getId());
            object2.replace("filesize",profilimage.getFilesize());
            object2.replace("lastmodified",profilimage.getLastmodified());
            object2.replace("filetype",profilimage.getFiletype());
            object2.replace("image",profilimage.getImage());

            object.replace("profilimage",object2);
        }
        return object;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JSONObject> login(@Valid @RequestBody User user) {
        JSONObject toSendObject = new JSONObject();
        toSendObject.put("id",null);
        toSendObject.put("username",null);
        toSendObject.put("profilimage",null);
        toSendObject.put("right",null);
        try {
            User user1 = userRepository.findByUsernameAndPssword(user.getUsername(), user.getPssword());

            //String hashed_pssword = generateHashBCryptPassword(user.getPssword(),salt);
            //User user1 = userRepository.findByUsername(user.getUsername());
            if (!user1.equals(null)) {
                toSendObject = loggedJsonObject(user1);
            }
        } catch (Exception e) {
            System.out.println("User with Username " + user.getUsername() + " don't exist" );
        }
        return ResponseEntity.ok().body(toSendObject);
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        System.out.println("all usres");
        return userRepository.findAll();
    }

    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @PostMapping("/user/uploadProfilImage")
    public Profilimage uploadProfilImage(@Valid @RequestBody Profilimage profilimage) {
        System.out.println("potential profil image user");
        // byte[] picBytes = profilimage.getImageStringForm().getBytes(StandardCharsets.UTF_8);
        byte[] picBytes = Base64.getEncoder().encode(profilimage.getImageStringForm().getBytes());
        Profilimage _profilimage1 = profilImageRepository.save(new Profilimage( picBytes, profilimage.getFilesize(), profilimage.getLastmodified(), profilimage.getFiletype()));
        return _profilimage1;
    }

    @PutMapping("/user/updateUploadProfilImage")
    public Profilimage updateUploadProfilImage(@Valid @RequestBody Profilimage profilimage) {
        System.out.println("UDPATE potential profil image user with this pic_ID " + profilimage.getId());
        byte[] picBytes = Base64.getEncoder().encode(profilimage.getImageStringForm().getBytes());

        Optional<Profilimage> found_profilimage = profilImageRepository.findById(profilimage.getId());
        if (found_profilimage.isPresent()) {
            Profilimage profilimageData = found_profilimage.get();
            profilimageData.setImage(picBytes);
            profilimageData.setFilesize(profilimage.getFilesize());
            profilimageData.setLastmodified(profilimage.getLastmodified());
            profilimageData.setFiletype(profilimage.getFiletype());
            Profilimage updateProfilimage =  profilImageRepository.save(profilimageData);

            return updateProfilimage;
        }else {
            return profilimage;
        }
    }

    @PostMapping(value = "/user/create")
    public  ResponseEntity<JSONObject> createUser(@Valid @RequestBody User user) {
        System.out.println("store user");

        JSONObject toSendObject = new JSONObject();
        toSendObject.put("id",null);
        toSendObject.put("username",null);
        toSendObject.put("profilimage",null);
        toSendObject.put("right",null);


        Instant timestamp = Instant.now();

        try {
            User _user = userRepository.save(new User(user.getEmail(), user.getUsername(), user.getSurname(), user.getFirstname(),user.getPssword(), user.getDescription(), timestamp, user.getIdprofilimage() ) );
            // User _user = userRepository.save(new User(user.getEmail(), user.getUsername(), user.getSurname(), user.getFirstname(), generateHashBCryptPassword(salt,user.getPssword()), user.getDescription(), timestamp, user.getIdprofilimage() ) );

            Integer id_user = _user.getId();
            if (!_user.equals(null)) {
                toSendObject = loggedJsonObject(_user);

                // secretnummber generate by another function, but i set it here some value just for testing
                //accountRepository.save( new Account(id_user,00.00,"JNnam29KD"));
                accountRepository.save( new Account(id_user,00.00, generateSecretnumber()));
            }
        } catch (Exception e){
            System.out.println("user don't exists now");
        }
        return ResponseEntity.ok().body(toSendObject);
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

    @GetMapping("/getUserByUsername/{username}")
    public ResponseEntity<JSONObject> getUserByUsername(@PathVariable(value = "username") String  username) {
        System.out.println("Get User with Username = " + username + "...");
        JSONObject object = new JSONObject();
        object.put("id",null);
        object.put("username",null);
        object.put("profilimage",null);

        JSONObject object2 = new JSONObject();
        object2.put("id",null);
        object2.put("filesize",null);
        object2.put("lastmodified",null);
        object2.put("filetype",null);
        object2.put("image",null);

        try {
            User user = userRepository.findByUsername(username);
            object.replace("id", user.getId());
            object.replace("username", user.getUsername());

            if (!user.equals(null)) {
                Profilimage profilimage = profilImageRepository.getOne(user.getIdprofilimage());
                object2.replace("id",profilimage.getId());
                object2.replace("filesize",profilimage.getFilesize());
                object2.replace("lastmodified",profilimage.getLastmodified());
                object2.replace("filetype",profilimage.getFiletype());
                object2.replace("image",profilimage.getImage());

                object.replace("profilimage", object2);
            }
        }catch (Exception e) {
            System.out.println("User with Username " + username + " don't exist" );
        }
        return ResponseEntity.ok().body(object);
    }

    @PutMapping("/updateUserData/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Integer userId, @Valid @RequestBody User user)
        throws ResourceNotFoundException {
        System.out.println("Update User with ID = " + userId + "...");

        User _user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

        _user.setFirstname(user.getFirstname());
        _user.setSurname(user.getSurname());
        _user.setUsername(user.getUsername());
        _user.setEmail(user.getEmail());
        _user.setDescription(user.getDescription());
        _user.setPssword(user.getPssword());
        //_user.setPssword(generateHashBCryptPassword(user.getPssword(), salt));
        _user.setIdprofilimage(user.getIdprofilimage());

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

    public String generateSecretnumber() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return generatedString;
    }
    public String generateHashBCryptPassword(String salt, String pssword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(salt + pssword);
    }
    public Boolean checkerPassword(String salt, String rawPassword, String encodedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPasswordWithSalt = passwordEncoder.encode(salt + rawPassword);
        if (passwordEncoder.matches(rawPasswordWithSalt,encodedPassword)){
            return true;
        }else{
            return false;
        }
    }/*
    <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency> */
}
