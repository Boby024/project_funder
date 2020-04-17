package william_research_project.project_funder_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import william_research_project.project_funder_backend.model.Categorie;
import william_research_project.project_funder_backend.repository.CategorieRepository;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class CategorieController {
    @Autowired
    CategorieRepository categorieRepository;

    @GetMapping("/categories")
    public List<Categorie> getUsers() {
        return categorieRepository.findAll();
    }

    @PostMapping(value = "/categorie/create")
    public Categorie createUser(@Valid @RequestBody Categorie categorie) {
        System.out.println("store categorie...");
        Categorie _categorie = categorieRepository.save(new Categorie(categorie.getName() ) );
        return _categorie;
    }
}
