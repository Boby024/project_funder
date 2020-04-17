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
        Integer id = project.getCreatorId();
        Instant timestamp = Instant.now();
        Project _project = projectRepository.save(new Project(project.getTitle(),project.getDescription(),
                project.getStatus(),project.getFundinglimit(),project.getCreatorId(),project.getPredecessor(),project.getCategorieId(),
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

    @PutMapping("/updateProject/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable(value = "projectId") Integer projectId, @Valid @RequestBody Project project)
            throws ResourceNotFoundException{
        System.out.println("Get Project number with ID = " + projectId + "...");
        Project _project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found for this id :: " + projectId));
        _project.setTitle(project.getTitle());
        _project.setDescription(project.getDescription());
        _project.setFundinglimit(project.getFundinglimit());
        _project.setPredecessor(project.getPredecessor());
        _project.setCategorieId(project.getCategorieId());
        final Project updateProject = projectRepository.save(_project);
        return ResponseEntity.ok(updateProject);
    }

}
