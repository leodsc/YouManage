package com.manageme.repository;

import com.manageme.model.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {

    List<EmployeeModel> findByNameContainingIgnoreCase(String name);
    List<EmployeeModel> findByDepartmentContainingIgnoreCase(String department);
    List<EmployeeModel> findByBirthday(Date birthday);
    Optional<EmployeeModel> findByEmail(String email);
}
