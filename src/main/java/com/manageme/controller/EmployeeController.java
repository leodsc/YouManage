package com.manageme.controller;

import com.manageme.exceptions.EmailAlreadyExistsException;
import com.manageme.exceptions.EmployeeNotFoundException;
import com.manageme.model.EmployeeModel;
import com.manageme.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/employee")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    public EmployeeService employeeService;

    @GetMapping
    public List<EmployeeModel> getAllEmployees() {
        System.out.println("oi");
        return employeeService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<EmployeeModel> createEmployee(@RequestBody EmployeeModel employee) {
        try {
            System.out.println("oi");
            HttpStatus status = employeeService.create(employee);
            return ResponseEntity.status(status).body(employee);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(employee);
        }
    }

    @PutMapping
    public ResponseEntity<EmployeeModel> updateEmployee(@RequestBody EmployeeModel employee) {
        try {
            return employeeService.update(employee);
        } catch (EmployeeNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteEmployee(@PathVariable Long id) {
        return employeeService.delete(id);
    }
}
