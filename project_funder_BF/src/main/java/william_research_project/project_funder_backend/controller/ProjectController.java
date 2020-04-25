package william_research_project.project_funder_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import william_research_project.project_funder_backend.exception.ResourceNotFoundException;
import william_research_project.project_funder_backend.model.Project;
import william_research_project.project_funder_backend.repository.ProjectRepository;
import william_research_project.project_funder_backend.repository.UserRepository;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class ProjectController {
    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/projects")
    public List<Project> getProjects() {
        System.out.println("all projects...");
        return projectRepository.findAll();
    }

    @PostMapping(value = "/createProject")
    public Project createProject(@Valid @RequestBody Project project) {
        System.out.println("store project...");
        System.out.println(project);
        Instant timestamp = Instant.now();
        String status = "active";
        Project _project = projectRepository.save(new Project(project.getTitle(),project.getDescription(),
                status,project.getFundinglimit(),project.getCreatorId(),project.getPredecessor(),project.getCategorieId(),
                timestamp) );
        return _project;
    }

    @GetMapping("/getProject/{id}")
    public ResponseEntity<Project> getProject(@PathVariable(value = "id") Integer projectId)
            throws ResourceNotFoundException {
        System.out.println("Get project with ID = " + projectId + "...");
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("project not found for this id :: " + projectId));
        return ResponseEntity.ok().body(project);
    }

    @GetMapping("/userProjects/{creatorid}")
    public List<Project> userProjects(@PathVariable(value = "creatorid") Integer creatorid) {
        System.out.println("Get projects from user with ID = " + creatorid + "...");
        List<Project> projects = projectRepository.findByCreatorId(creatorid);
        return projects;
    }

    @PutMapping("/updateProject")
    public ResponseEntity<Project> updateProject(@Valid @RequestBody Project project) {
        System.out.println("Get Project number with ID = " + project.getIdentifier() + "...");
        System.out.println(project.toString());
        Project updateProject = new Project();
        try {
            Project _project = projectRepository.findByIdentifierAndCreatorId(project.getIdentifier(), project.getCreatorId());
            System.out.println(_project.toString());
            // .orElseThrow(() -> new ResourceNotFoundException("Project not found for this id :: " + project.getIdentifier()));
            _project.setTitle(project.getTitle());
            _project.setDescription(project.getDescription());
            _project.setFundinglimit(project.getFundinglimit());
            _project.setPredecessor(project.getPredecessor());
            _project.setCategorieId(project.getCategorieId());
            updateProject = projectRepository.save(_project);
        }catch (Exception e){
            System.out.println("This project  with this project id "+ project.getIdentifier()+" could not update with this user id " + project.getCreatorId());
        }
        return ResponseEntity.ok(updateProject);
    }

}
