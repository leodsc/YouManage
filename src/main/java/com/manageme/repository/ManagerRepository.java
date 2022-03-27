package com.manageme.repository;

import com.manageme.model.ManagerModel;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<ManagerModel, Long> {

    Optional<ManagerModel> findByToken(String token);
}
