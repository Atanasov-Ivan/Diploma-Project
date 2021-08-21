package com.gospodinovi.controllers;

import com.gospodinovi.models.DeviceControls;
import com.gospodinovi.models.dto.ControlsDto;
import com.gospodinovi.mqtt_engine.EngineTemperatureSensorPub;
import com.gospodinovi.service.ControlsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(path = "/controls")
public class ControlsController {

    @Autowired
    private ControlsService controlsService;

    @GetMapping
    public ResponseEntity<List<ControlsDto>> getAllControls(){
        return new ResponseEntity<>(controlsService.getAllControls(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> controlDevice(@RequestBody DeviceControls deviceControls){
        this.controlsService.controlDevice(deviceControls);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "devices")
    public ResponseEntity<List<ControlsDto>> getDevices(){
        List<ControlsDto> allControls = this.controlsService.getAllControls();
        return new ResponseEntity<>(allControls, HttpStatus.OK);
    }

}
