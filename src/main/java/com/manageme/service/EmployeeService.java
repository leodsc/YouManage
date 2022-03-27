package com.manageme.service;

import com.manageme.exceptions.EmailAlreadyExistsException;
import com.manageme.model.EmployeeModel;
import com.manageme.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    public List<EmployeeModel> getAll() {
        return repo.findAll();
    }

    public HttpStatus create(EmployeeModel employee) throws EmailAlreadyExistsException {
        Optional<EmployeeModel> optionalEmployee = repo.findByEmail(employee.getEmail());
        if (optionalEmployee.isPresent()) {
            throw new EmailAlreadyExistsException();
        }
        repo.save(employee);
        return HttpStatus.OK;
    }
}
