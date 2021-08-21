package com.gospodinovi.repository;

import com.gospodinovi.models.Catalog;
import com.gospodinovi.models.Controls;
import com.gospodinovi.models.TempSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, Long > {

    Optional<Catalog> findFirstByName(String name);
}
