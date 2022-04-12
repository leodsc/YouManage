package com.manageme.repository;

import com.manageme.model.ManagerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<ManagerModel, Long> {

    Optional<ManagerModel> findByToken(String token);
    @Query(value="SELECT * FROM manager_model WHERE name = ?1", nativeQuery = true)
    Optional<ManagerModel> findManagerByName(String name);
}
