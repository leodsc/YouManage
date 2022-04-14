package com.manageme.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity(name="manager")
public class ManagerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String name;
    
    @NotBlank
    private String password;

    @OneToMany(mappedBy = "manager", cascade=CascadeType.REMOVE)
    @JsonIgnoreProperties("manager")
    private List<EmployeeModel> employees;

    public String token;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<EmployeeModel> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeModel> employees) {
        this.employees = employees;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
