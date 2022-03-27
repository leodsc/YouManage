package com.manageme.service;

import com.manageme.exceptions.ManagerDoesntExistException;
import com.manageme.model.ManagerModel;
import com.manageme.repository.ManagerRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private ManagerRepository repo;

    public HttpStatus create(ManagerModel manager) {
        String token = manager.getName();
        String encodedToken = new String(Base64.encodeBase64String(token.getBytes()));
        manager.setToken(encodedToken);
        repo.save(manager);
        return HttpStatus.OK;
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
}
