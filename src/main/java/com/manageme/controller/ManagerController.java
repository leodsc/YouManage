package com.manageme.controller;

import com.manageme.exceptions.ManagerAlreadyExistsException;
import com.manageme.exceptions.ManagerDoesntExistException;
import com.manageme.model.ManagerModel;
import com.manageme.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @GetMapping("/all")
    public List<ManagerModel> getAll() {
        return managerService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createManager(@RequestBody ManagerModel manager) {
        HttpStatus status = managerService.create(manager);
        return ResponseEntity.status(status).body("Gerente criado!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginManager(@RequestBody ManagerModel manager) {
        return managerService.login(manager);
    }

//    @PutMapping("/update")
//    public ResponseEntity<String> updateManager(@RequestBody ManagerModel manager) {
//
//    }

    @DeleteMapping
    public ResponseEntity<String> deleteManager(@RequestBody ManagerModel manager) {
        try {
            managerService.delete(manager);
            return ResponseEntity.ok().body("Gerente deletado!");
        } catch(ManagerDoesntExistException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
