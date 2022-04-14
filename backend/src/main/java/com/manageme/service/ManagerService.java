package com.manageme.service;

import com.manageme.exceptions.ManagerAlreadyExistsException;
import com.manageme.exceptions.ManagerDoesntExistException;
import com.manageme.model.ManagerModel;
import com.manageme.repository.ManagerRepository;
import com.manageme.model.EmployeeModel;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private ManagerRepository repo;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public void create(ManagerModel manager) throws ManagerAlreadyExistsException {
        var dbManager = repo.findManagerByName(manager.getName());
        if (dbManager.isPresent()) {
            throw new ManagerAlreadyExistsException();
        }
        manager.setPassword(passwordEncoder.encode(manager.getPassword()));
        repo.save(manager);
    }

    public ResponseEntity<ManagerModel> login(ManagerModel manager) throws UsernameNotFoundException {
        var dbManager = repo.findManagerByName(manager.getName());
        if (dbManager.isPresent()) {
            validate(manager.getPassword(), dbManager.get().getPassword());
        }
        userDetailsService.loadUserByUsername(manager.getName());
        String token = createBase64Token(manager);
//        manager.setPassword("");
        dbManager.get().setToken("Basic " + token);
        repo.save(dbManager.get());
        return ResponseEntity.ok().body(dbManager.get());
    }

    public List<ManagerModel> getAll() {
        return repo.findAll();
    }

    public void delete(ManagerModel manager) throws ManagerDoesntExistException {
        var optManager = repo.findByToken(manager.getToken());
        if (optManager.isEmpty()) {
            throw new ManagerDoesntExistException();
        }
        repo.delete(manager);
    }

    public String createBase64Token(ManagerModel manager) {
        String token = manager.getName() + ":" + manager.getPassword();
        return Base64.getEncoder().encodeToString(token.getBytes(StandardCharsets.UTF_8));
    }

    private void validate(String password, String encodedPassword) throws UsernameNotFoundException {
        boolean passwordCheck = passwordEncoder.matches(password, encodedPassword);
        if (!passwordCheck) {
            throw new UsernameNotFoundException("Usuário não encontrado!");
        }
    }
}
