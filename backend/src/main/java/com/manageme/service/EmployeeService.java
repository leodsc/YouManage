package com.manageme.service;

import com.manageme.exceptions.EmailAlreadyExistsException;
import com.manageme.exceptions.EmployeeNotFoundException;
import com.manageme.model.EmployeeModel;
import com.manageme.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    public List<EmployeeModel> getAll(String auth) {
        return repo.findEmployeesByManagerToken(auth);
    }

    public HttpStatus create(EmployeeModel employee) throws EmailAlreadyExistsException {
        Optional<EmployeeModel> optionalEmployee = repo.findByEmail(employee.getEmail());
        if (optionalEmployee.isPresent()) {
            throw new EmailAlreadyExistsException();
        }
        repo.save(employee);
        return HttpStatus.OK;
    }

    public ResponseEntity<EmployeeModel> update(EmployeeModel employee) throws EmployeeNotFoundException {
         return repo.findById(employee.getId())
                .map(resp -> {
                    resp.setEmail(employee.getEmail());
                    resp.setName(employee.getName());
                    resp.setDepartment(employee.getDepartment());
                    resp.setHiringDate(employee.getHiringDate());
                    resp.setPhone(employee.getPhone());
                    resp.setAddress(employee.getAddress());
                    resp.setSalary(employee.getSalary());
                    resp.setTeam(employee.getTeam());
                    resp.setCpf(employee.getCpf());
                    resp.setBirthday(employee.getBirthday());
                    repo.save(resp);
                    return ResponseEntity.ok().body(resp);
                }).orElseThrow(EmployeeNotFoundException::new);
    }

    public ResponseEntity<List<EmployeeModel>> deleteEmployee(List<EmployeeModel> employees) {
        ArrayList<EmployeeModel> dbEmployees = new ArrayList<EmployeeModel>();
        employees.forEach((employee) -> {
            repo.findById(employee.getId())
                    .ifPresent((emp) -> {
                        dbEmployees.add(emp);
                        repo.delete(emp);
                    });
        });
        return ResponseEntity.ok(repo.findAll());
    }
}
