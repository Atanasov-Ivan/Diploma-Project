package com.gospodinovi.repository;

import com.gospodinovi.models.TempSensor;
import javafx.beans.Observable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TempSensorRepository extends JpaRepository<TempSensor, Long > {

    Optional<TempSensor> findTopByOrderByIdDesc();
}
