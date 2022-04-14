package com.manageme.repository;

import com.manageme.model.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {

    @Query(value="SELECT * FROM employee " +
            "INNER JOIN manager ON employee.manager_id = manager.id " +
            "WHERE manager.token = ?1",
            nativeQuery = true)
    List<EmployeeModel> findEmployeesByManagerToken(String token);
    List<EmployeeModel> findByNameContainingIgnoreCase(String name);
    List<EmployeeModel> findByDepartmentContainingIgnoreCase(String department);
    List<EmployeeModel> findByBirthday(Date birthday);
    Optional<EmployeeModel> findByEmail(String email);
}
