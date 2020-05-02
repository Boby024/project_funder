package william_research_project.project_funder_backend.controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import william_research_project.project_funder_backend.model.Account;
import william_research_project.project_funder_backend.model.Donate;
import william_research_project.project_funder_backend.model.Project;
import william_research_project.project_funder_backend.repository.AccountRepository;
import william_research_project.project_funder_backend.repository.DonateRepository;
import william_research_project.project_funder_backend.repository.ProjectRepository;

import javax.validation.Valid;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/projectfunder")
public class DonateController {
    @Autowired
    DonateRepository donateRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/donateMoney")
    public ResponseEntity<JSONObject> donateMoney(@Valid @RequestBody Donate donate) {
        System.out.println("store donate...");
        System.out.println(donate.toString());
        System.out.println("we store now :)");

        JSONObject feedback = new JSONObject();
        feedback.put("alreadyDonate",true); // if the user already donate for the project
        feedback.put("statusProject","maybe"); // the project still actinot
        feedback.put("enoughCredit","maybe");// if there was enough credit the account of user
        Donate storeDonate = new Donate();
        //Optional<Donate> donateata = donateRepository.findById(donate.getDonatorId());
        Optional<Donate> allDonateFromUserWithIdPorject = Optional.ofNullable(donateRepository.findByDonatorIdAndProject(donate.getDonatorId(), donate.getProject()));

        if (!allDonateFromUserWithIdPorject.isPresent()) { // !donateata.isPresent()
            System.out.println("no donate with user_Id... and project_Id...");

            feedback.replace("alreadyDonate",false);
            Optional<Project> projectData = projectRepository.findById(donate.getProject());

            if (projectData.isPresent()) {
                Project project = projectData.get();

                if("active".equals(project.getStatus() ) ) {
                    feedback.replace("statusProject","active");
                    Optional<Account> accountData = accountRepository.findById(donate.getDonatorId());

                    if (accountData.isPresent()) {
                        Account account = accountData.get();
                        System.out.println(account.toString());
                        Double credit = account.getCredit();
                        if (donate.getDonationamount() <= credit) {
                            Double newCredit = credit - donate.getDonationamount();
                            Instant timestamp = Instant.now();
                            storeDonate = donateRepository.save(new Donate(donate.getDonatorId(),project.getIdentifier(), donate.getDonationamount(),donate.getVisibility(),timestamp));
                            if (!storeDonate.getId().equals(null) ) {
                                account.setCredit(newCredit);
                                final Account updateAccount = accountRepository.save(account);
                                if (!updateAccount.getCredit().equals(null)) {
                                    feedback.replace("enoughCredit","yes"); // if it was enouh credit on the account
                                }

                                //Now I check if it's enough money for the project and when ja, I close it with attribute "closed"
                                Double fundinglimit_All = 0.00;
                                List<Donate> donates = donateRepository.findAllByProject(donate.getProject());
                                if (donates.size() > 0) {
                                    for(int i = 0; i< donates.size();i++) {
                                        fundinglimit_All += donates.get(i).getDonationamount();
                                    }
                                    if (fundinglimit_All >= project.getFundinglimit() ) {
                                        project.setStatus("closed");
                                        final Project updateProject = projectRepository.save(project);
                                        feedback.put("statusProject","closed");
                                        System.out.println(updateProject.toString());
                                    }else {
                                        feedback.put("statusProject","active");
                                    }
                                }

                            }
                        }else {
                            feedback.replace("enoughCredit","no"); // if it was not enouh credit on the account
                        }
                    }
                }
            }
        }else {
            System.out.println("Donate => "+allDonateFromUserWithIdPorject.get().toString() );
        }
        return ResponseEntity.ok().body(feedback);
    }

    @GetMapping(value = "/getDonationAmount/{projectId}")
    public ResponseEntity<JSONObject> getDonationAmount(@PathVariable(value = "projectId") Integer projectId) {
        System.out.println("get Donation Amount...");
        JSONObject object = new JSONObject();
        object.put("donationAmount",0.00);
        Double fundinglimit_All = 0.00;
        List<Donate> donates = donateRepository.findAllByProject(projectId);
        for(int i = 0; i< donates.size();i++) {
            fundinglimit_All += donates.get(i).getDonationamount();
        }
        object.replace("donationAmount",fundinglimit_All);
        return ResponseEntity.ok().body(object);
    }

    @GetMapping(value = "/listSupportedProjectByDonator/{donatorId}")
    public List<Project> ListSupportedProjectByDonator(@PathVariable(value = "donatorId") Integer donatorId) {
        System.out.println("List of supported projects by this donator "+ donatorId );
        List<Project> projects = new ArrayList<>();
        try {
            List<Donate> donates = donateRepository.findAllByDonatorId( donatorId );
            if (donates.size() > 0) {
                System.out.println(donates.size());
                for (int i = 0; i< donates.size(); i++) {
                    System.out.println(donates.get(i).toString());
                    Optional<Project> foundProject = projectRepository.findById(donates.get(i).getProject());
                    if (foundProject.isPresent()) {
                        Project finalProjectFound = foundProject.get();
                        System.out.println(foundProject.toString());
                        projects.add(finalProjectFound);
                    }
                }
            }
        }catch (Exception e) {
            System.out.println("Error Found by ListSupportedProjectByDonator");
            // projects = null;
        }
        return projects;
    }

    @GetMapping(value = "/numberSupportedProject/{userId}")
    public ResponseEntity<JSONObject> numberSupportedProject(@PathVariable(value = "userId") Integer userId) {
        System.out.println("get number supported projects...");
        JSONObject object = new JSONObject();
        object.put("numberSupportedProject",0);
        object.put("numberCreatedProject",0);
        List<Donate> donates = donateRepository.findAllByDonatorId(userId);
        List<Project> projects = projectRepository.findByCreatorId(userId);
        System.out.println("numberSupportedProject => "+donates.size() );
        System.out.println("numberCreatedProject => "+projects.size() );
        object.replace("numberSupportedProject",donates.size());
        object.replace("numberCreatedProject", projects.size());
        return ResponseEntity.ok().body(object);
    }

    @GetMapping(value = "/listDonationByProjectId/{projectId}")
    public List<Donate> ListDonateByProjectId(@PathVariable(value = "projectId") Integer projectId) {
        System.out.println("list of donation By ProjectId");
        return donateRepository.findAllByProject(projectId);
    }
}
