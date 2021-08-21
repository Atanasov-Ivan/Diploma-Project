package com.gospodinovi.controllers;

import com.gospodinovi.models.dto.TempSensorDto;
import com.gospodinovi.service.TempSensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TempController {

    @Autowired
    private TempSensorService tempSensorService;


    @GetMapping
    public ResponseEntity<TempSensorDto> getTemp(){
        return new ResponseEntity<>(tempSensorService.getLatestTemp(), HttpStatus.OK);
    }



}
