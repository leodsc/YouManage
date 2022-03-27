package com.manageme.controller;

import com.manageme.exceptions.EmailAlreadyExistsException;
import com.manageme.model.EmployeeModel;
import com.manageme.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    public EmployeeService employeeService;

    @GetMapping
    public List<EmployeeModel> getAllEmployees() {
        return employeeService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createEmployee(@RequestBody EmployeeModel employee) {
        try {
            HttpStatus status = employeeService.create(employee);
            return ResponseEntity.status(status).body("Funcionário criado!");
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
