package com.gospodinovi.repository;

import com.gospodinovi.models.Controls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ControlsRepository extends JpaRepository<Controls, Long > {

    Optional<Controls> findFirstByName(String name);
}
