package com.manageme.service;

import com.manageme.exceptions.ManagerDoesntExistException;
import com.manageme.model.ManagerModel;
import com.manageme.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
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

    public HttpStatus create(ManagerModel manager) {
        manager.setPassword(passwordEncoder.encode(manager.getPassword()));
        repo.save(manager);
        return HttpStatus.OK;
    }

    public ResponseEntity<String> login(ManagerModel manager) {
        try {
            userDetailsService.loadUserByUsername(manager.getName());
            String token = createBase64Token(manager);
            return ResponseEntity.ok().body(token);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
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
}
