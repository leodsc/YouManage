package com.manageme.controller;

import com.manageme.exceptions.ManagerAlreadyExistsException;
import com.manageme.exceptions.ManagerDoesntExistException;
import com.manageme.model.ManagerModel;
import com.manageme.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/manager")
@CrossOrigin("*")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @GetMapping("/all")
    public List<ManagerModel> getAll() {
        return managerService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<ManagerModel> createManager(@RequestBody ManagerModel manager) {
        try {
            managerService.create(manager);
            manager.setPassword("");
            return ResponseEntity.ok().body(manager);
        } catch (ManagerAlreadyExistsException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ManagerModel> loginManager(@RequestBody ManagerModel manager) {
        try {
            return managerService.login(manager);
        } catch (UsernameNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
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
